const Queue = require('../voice/queue');
const { simpleEmbed } = require('../functions/embeds');
const Perms = require('../functions/defaultPerms');

async function command(message, args) {
    const guildId = message.guildId;
    const queue = await Queue.getQueue(guildId);

    if(queue == null) {
        message.reply(simpleEmbed("I'm not currently playing anything!"));
        return;
    }
    try {
        await queue.connection.disconnect();
        //await Queue.deleteQueue(guildId);
        //message.reply(simpleEmbed("Player stopped and queue cleared!"));
    } catch (e) {
        console.log(e);
        message.reply(simpleEmbed("Something went wrong :("));
    }

}

module.exports = {
    name: 'stop',
    description: 'Stops the player, clears the queue and leaves the call',
    alias: [],
    perms: [Perms.isUserAdmin],
    execute: command
}