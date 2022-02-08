const Queue = require('../voice/queue');

const { simpleEmbed } = require('../functions/embeds');


async function command(message) {
    try {
        const guildId = message.guild.id;
        const queue = await Queue.getQueue(guildId);
        const currentSong = queue.songs[0]
        message.reply(simpleEmbed(currentSong.title));
    } catch (e) {   
        message.reply(e.message);
        console.log(e);
    }

}

module.exports = {
    name: 'nowplaying',
    description: '',
    perms: '',
    execute: command
}