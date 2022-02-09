const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');

async function command(message, args) {
    const guildId = message.guild.id;
    const queue = await Queue.getQueue(guildId);
    const player = queue.player;

    player.pause();
    message.reply(Embeds.simpleEmbed("**Player Paused**"));
}

module.exports = {
    name: 'pause',
    description: 'Pauses current song',
    perms: '',
    execute: command
}