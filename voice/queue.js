const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const queues = new Map();

async function hasQueue(guildId){
    return queues.has(guildId);
}

async function getQueue(guildId) {
    console.log('GETTING QUEUE');
    return await queues.get(guildId);

}

async function newQueue(guildId, message, connection, player) {
    if (queues.has(guildId)) return;
    queues.set(guildId, {
        //channelId: message.member.voice.channel.id,
        //guildId: guildId,
        //adapterCreator: message.guild.voiceAdapterCreator,
        songs: [],
        connection: connection,
        player: player,
        playing: true,
        volume: 5

    });
    console.log('CREATING NEW QUEUE');

}

async function deleteQueue(guildId) {
    console.log('DELETING QUEUE');
    queues.delete(guildId);
}

async function extractInfo(url) {
    const info = await ytdl.getInfo(url)
    return {
        title: info.videoDetails.title,
        url: info.videoDetails.video_url
    }
}

async function addSongToQueue(guildId, songInfo) {
    const queue = await queues.get(guildId);
    queue.songs.push(songInfo);
    console.log('ADDING SONG TO QUEUE');
}

async function playing(guildId, playingBool) {
    queues.get(guildId).playing = playingBool;
}

async function getCurrentSong(guildId) {
    console.log('GETTING NEXT SONG');
    if(queues.get(guildId).songs.length == 0) return;
    return queues.get(guildId).songs[0];
}

async function deleteCurrentSong(guildId) {
    console.log('DELETING CURRENT SONG');
    return queues.get(guildId).songs.shift();
}

async function deleteSong(guildId, number) {
    const queue = queues.get(guildId);
    if(queue.songs.length > number) {
        return queue.songs.splice(number, 1)[0];
    }
    return false;
}

module.exports = {
    hasQueue,
    getQueue,
    newQueue,
    extractInfo,
    addSongToQueue,
    deleteQueue,
    playing,
    getCurrentSong,
    deleteCurrentSong,
    deleteSong
}