const Voice = require('@discordjs/voice');
const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');


async function command(message) {
    try {
        const guildId = message.guild.id;
        const queue = await Queue.getQueue(guildId);
        if(queue == null) {
            message.reply(Embeds.simpleEmbed("**I'm not currently playing anything**"));
            return;
        }
        if(!queue.playing) {
            message.reply(Embeds.simpleEmbed("**I'm not currently playing anything. Type #stop for me to leave the call**"));
            return;
        }
        message.reply(Embeds.simpleEmbed(`Skipping **${queue.songs[0].title}**`));
        await queue.player.stop();
    } catch(e) {
        message.reply(e.message);
        console.log(e);
    }
}

module.exports = {
    name: 'skip',
    description: 'Skips the current song',
    alias: ['s'],
    perms: '',
    execute: command
}