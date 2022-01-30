const Queue = require('../voice/queue');
const { simpleEmbed } = require('../functions/embeds');

async function command(message, args) {
    const guildId = message.guildId;
    const hasQueue = await Queue.hasQueue(guildId);

    if(!hasQueue) {
        message.reply(simpleEmbed("I'm not currently playing anything!"));
        return;
    }
    try {
        const queue = await Queue.getQueue(guildId);
        await queue.connection.destroy();
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