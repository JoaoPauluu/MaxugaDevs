const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');

async function command(message, args) {
    try {
        const guildId = message.guild.id;
        const queue = await Queue.getQueue(guildId);
        if(queue == null) {
            message.reply(Embeds.simpleEmbed('**Currently not playing any song**'));
            return;
        }
        if(queue.playing == false) {
            message.reply(Embeds.simpleEmbed('**Currently not playing any song. If you want me to disconnect type #stop**'));
            return;
        }
    
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
    description: 'Shows the current queue on this guild',
    perms: '',
    execute: command
}