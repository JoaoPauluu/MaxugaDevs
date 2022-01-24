const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const Queue = require('../voice/queue');
const Player = require('../voice/player');
const { simpleEmbed, searchEmbed } = require('../functions/embeds');

function checkIfUrl(_string) {
    // Returs true or false if the string is a url
    const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return pattern.test(_string);
}





async function command(message, args) {
    const guildId = message.guild.id;
    if(checkIfUrl(args[0])) {
        // Runs if user typed an url
        try {
            const url = args[0];
            Player.playSong(message, guildId, url);
            return;
        } catch {
            message.reply(simpleEmbed('Something wrong happened. Did you type a Youtube URL?'));
        }
    }
    // Searches for what the user has typed
    const querry = args.join(' ');
    const result = await yts(querry);
    const url = result.videos[0].url
    Player.playSong(message, guildId, url);
    //console.log(result);

    return;


}

module.exports = {
    name: 'play',
    description: '',
    perms: '',
    execute: command
}