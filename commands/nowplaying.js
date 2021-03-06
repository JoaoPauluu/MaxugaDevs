const Queue = require('../voice/queue');

const { simpleEmbed } = require('../functions/embeds');


async function command(message) {
    try {
        const guildId = message.guild.id;
        const queue = await Queue.getQueue(guildId);

        if(queue == null || !queue.playing) {
            message.reply(simpleEmbed("**Currently not playing anything**"));
            return;
        }

        const currentSong = queue.songs[0]
        message.reply(simpleEmbed(currentSong.title));
    } catch (e) {   
        message.reply(e.message);
        console.log(e);
    }

}

module.exports = {
    name: 'nowplaying',
    description: 'Shows the song that the bot is playing',
    alias: ['np'],
    perms: [],
    execute: command
}