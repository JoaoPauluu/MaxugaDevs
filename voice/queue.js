const Voice = require('@discordjs/voice');
//const ytdl = require('ytdl-core');
const pldl = require('play-dl');
const yts = require('yt-search');

const queues = new Map();

async function hasQueue(guildId){
    // Checks if a guid already has a queue
    return queues.has(guildId);
}

async function getQueue(guildId) {
    // Gets a queue from a guild
    console.log('GETTING QUEUE');
    return await queues.get(guildId);

}

async function newQueue(guildId, message, connection, player) {
    // Creates a new queue for a guild
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
    // Deletes a guild queue
    console.log('DELETING QUEUE');
    queues.delete(guildId);
}

async function extractInfo(url) {
    // Extracts youtube video info from a url
    try {
        /*
        const info = await ytdl.getInfo(url)
        return {
            title: info.videoDetails.title,
            url: info.videoDetails.video_url
        }
        */
        const info = await pldl.video_basic_info(url);
        return {
            title: info.video_details.title,
            url: info.video_details.url
        }
    } catch (err) {
        console.log(err);
    }
}

async function addSongToQueue(guildId, songInfo) {
    // Adds a song to the end of the queue of a guild
    const queue = await queues.get(guildId);
    queue.songs.push(songInfo);
    console.log('ADDING SONG TO QUEUE');
}

async function playing(guildId, playingBool) {
    // Changes the status of playing in a guild queue
    queues.get(guildId).playing = playingBool;
}

async function getCurrentSong(guildId) {
    // Get the song that is curretly playing on a guild
    console.log('GETTING NEXT SONG');
    if(queues.get(guildId).songs.length == 0) return;
    return queues.get(guildId).songs[0];
}

async function deleteCurrentSong(guildId) {
    // Deletes the current song from the queue
    console.log('DELETING CURRENT SONG');
    return queues.get(guildId).songs.shift();
}

async function deleteSong(guildId, number) {
    // Deletes a given song from the queue
    const queue = queues.get(guildId);
    if(queue.songs.length > number) {
        return queue.songs.splice(number, 1)[0];
    }
    return false;
}

async function topVideos(querry) {
    // Returns an array of 6 videos that match the querry
    try {
        let result = await yts.search(querry);
        result = result.videos;
        result = result.slice(0, 6);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
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
    deleteSong,
    topVideos
}