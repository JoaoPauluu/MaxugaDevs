const Queue = require('../voice/queue');
const { simpleEmbed } = require('../functions/embeds');

async function command(message, args) {
    try {
        if(args.length == 0) {
            message.reply(simpleEmbed('**Please pass in a number to remove the song**'));
            return;
        }

        const number = parseInt(args[0]);
        const guildId = message.guild.id;
        const queue = await Queue.getQueue(guildId);

        if(number == NaN) {
            message.reply(simpleEmbed('**Invaid Function Argument, please use a number**'));
            return;
        }

        if(queue == null) {
            message.reply(simpleEmbed('**Not playing anything at the moment, try using *play***'));
            return;
        }

        if(number == 0) {
            message.reply(simpleEmbed('**Cannot remove current song from queue, use *skip* instead**'));
            return;
        }
        if(number < 0) {
            message.reply(simpleEmbed('**Invalid selection, please input a positive number**'));
            return;
        }

        const song = await queue.deleteSong(number);

        if(!song) {
            message.reply(simpleEmbed("**This song doesn't exit!**"));
            return;
        }
        if(song) {
            message.reply(simpleEmbed(`**${song.title}** removed from the queue!`));
        }

    } catch(e) {
        message.reply(e.message);
        console.log(e);
    }
}

module.exports = {
    name: 'remove',
    description: 'Removes a given song from the queue\nUsage: #remove <number>',
    perms: '',
    execute: command
}