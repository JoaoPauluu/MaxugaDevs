const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');


async function command(message, args) {
    try {
        const guildId = message.guild.id;
        const hasQueue = Queue.hasQueue(guildId);
        if(!hasQueue) message.reply(Embeds.simpleEmbed("**I'm not currently playing anything**"));

        const queue = await Queue.getQueue(guildId);
        message.reply(Embeds.simpleEmbed(`Skipping **${queue.songs[0].title}**`));
        await queue.player.stop();
    } catch(e) {
        message.reply(e.message);
        console.log(e);
    }
}

module.exports = {
    name: 'skip',
    description: '',
    perms: '',
    execute: command
}