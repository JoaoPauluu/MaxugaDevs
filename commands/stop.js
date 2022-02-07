const Queue = require('../voice/queue');
const { simpleEmbed } = require('../functions/embeds');

async function command(message, args) {
    const guildId = message.guildId;
    const queue = await Queue.getQueue(guildId);

    if(queue = null) {
        message.reply(simpleEmbed("I'm not currently playing anything!"));
        return;
    }
    try {
        await Queue.deleteQueue(guildId);
        message.reply(simpleEmbed("Player stopped and queue cleared!"));
    } catch (e) {
        console.log(e);
        message.reply(simpleEmbed("Something went wrong :("));
    }

}

module.exports = {
    name: 'stop',
    description: '',
    perms: '',
    execute: command
}