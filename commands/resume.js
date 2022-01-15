const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');

async function command(message, args) {
    const guildId = message.guild.id;
    const queue = await Queue.getQueue(guildId);
    const player = queue.player;

    player.unpause();
    message.reply(Embeds.simpleEmbed("**Player Resume**"));
}

module.exports = {
    name: 'resume',
    description: '',
    perms: '',
    execute: command
}