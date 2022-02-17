const Voice = require('@discordjs/voice');
//const ytdl = require('ytdl-core');
const yts = require('yt-search');
const Queue = require('../voice/queue');
const Player = require('../voice/player');
const { simpleEmbed } = require('../functions/embeds');

function checkIfUrl(_string) {
    // Returs true or false if the string is a url
    const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return pattern.test(_string);
}





async function command(message, args) {
    // Check if the conditions match so that the commannd can run
    const queue = await Queue.getQueue(message.guild.id);
    if(args.length == 0) {
        message.reply(simpleEmbed('You need to type a Youtube URL or a search querry'));
        return;
    }
    if(!message.member.voice.channel) {
        message.reply(simpleEmbed('**You need to be in a voice channel to run this command**'));
        return;
    }
    if(queue != null && message.member.voice.channel.id != queue.voiceChannelId) {
        message.reply(simpleEmbed(`**You need to join <#${queue.voiceChannelId}> to run this command**`));
        return;
    }

    const guildId = message.guild.id;
    if(checkIfUrl(args[0])) {
        // Runs if user typed an url
        try {
            const url = args[0];
            Player.handleSong(message, url);
            return;
        } catch {
            message.reply(simpleEmbed('Something wrong happened. Did you type a Youtube URL?'));
        }
    }
    // Searches for what the user has typed
    try {
        const querry = args.join(' ');
        const result = await yts(querry);
        const url = result.videos[0].url
        Player.handleSong(message, url);
        //console.log(result);
    
        return;
    } catch (e) {
        console.log(e);
        message.reply(e.message);
    }

}

module.exports = {
    name: 'play',
    description: 'Plays a song\nUsage: #play <querry/url>',
    alias: [],
    perms: '',
    execute: command
}