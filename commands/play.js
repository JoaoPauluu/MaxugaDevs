const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const Queue = require('../voice/queue');
const Player = require('../voice/player');

function checkIfUrl(_string) {
    const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return pattern.test(_string);
}



async function command(message, args) {
    const guildId = message.guild.id;
    if(checkIfUrl(args[0])) {
        // Runs if user typed an url
        const url = args[0];
        Player.playSong(message, guildId, url);
        return;
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