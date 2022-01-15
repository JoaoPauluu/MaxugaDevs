const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');

async function command(message, args) {
    try {
        const guildId = message.guild.id;
        const hasQueue = await Queue.hasQueue(guildId);
        if(!hasQueue) {
            message.reply(Embeds.simpleEmbed('**Currently not playing any song**'));
            return;
        }
    
        const queue = await Queue.getQueue(guildId);
        const songs = queue.songs;
    
        const queueEmbed = Embeds.queueEmbed(songs);
    
        message.reply({ embeds: [queueEmbed] });

    } catch (e) {
        message.reply(e.message);
        console.log(e);
    }

}

module.exports = {
    name: 'queue',
    description: '',
    perms: '',
    execute: command
}