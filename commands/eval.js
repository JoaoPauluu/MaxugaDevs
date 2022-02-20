const Voice = require('@discordjs/voice');
const Queue = require('../voice/queue');
const Embeds = require('../functions/embeds');
const Perms = require('../functions/defaultPerms');


async function command(message, args) {
    const code = args.join(' ');
    try {
        eval(code);
    } catch(e) {
        message.reply(e);
    }
}

module.exports = {
    name: 'eval',
    description: 'Runs the argument as Javascript code **CAN ONLY BE USED BY THE BOT AUTHOR**',
    alias: [],
    perms: [Perms.isUserBotCreator],
    execute: command
}