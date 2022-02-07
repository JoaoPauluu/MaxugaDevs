const Voice = require('@discordjs/voice');
//const ytdl = require('ytdl-core');
const pldl = require('play-dl');
const yts = require('yt-search');

pldl.setToken({
    useragent: [process.env.USER_AGENT]
});




const queues = new Map();



function logger(functionName, guildId) {
    console.log(`Exec: ${functionName} at: ${guildId}`);
    return;
}


async function getQueue(guildId) {
    logger('getQueue', guildId);
    
    if(!queues.has(guildId)) return null; 
    return await queues.get(guildId);
    
}

async function extractInfo(url) {
    logger('extractInfo', url);

    try {
        const info = await pldl.video_basic_info(url);
        return {
            title: info.video_details.title,
            url: info.video_details.url
        }
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong while extracting video info");
    }
}

async function deleteQueue(guildId) {
    logger('deleteQueue', guildId);

    const queue = queues.get(guildId);

    try {
        queue.connection.disconnect();
        queue.connection.destroy();
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when disconnecting from voice channel");
    } finally {
        queues.delete(guildId);
    }
}

async function topVideos(querry) {
    // Returns an array of 6 videos that match the querry
    logger('topVideos', querry);

    try {
        let result = await yts.search(querry);
        result = result.videos;
        result = result.slice(0, 6);
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong with the search");
    }
}

async function newQueue(message) {
    const guildId = message.guildId;

    logger('newQueue', guildId);

    if (queues.has(guildId)) return queues.get(guildId);
    
    // Creaters a player and a connection for that queue
    const player = Voice.createAudioPlayer();
    const connection = Voice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: guildId,
        adapterCreator: message.guild.voiceAdapterCreator
    })

    await connection.subscribe(player);

    queues.set(guildId, {
        guildId: guildId,
        songs: [],
        connection: connection,
        player: player,
        playing: false,
        timeout: null,
        volume: 5,

        get currentSong() {
            logger('currentSong', this.guildId);

            return this.songs[0];
        },

        async addSongToQueue(songInfo) {
            logger('addSongToQueue', this.guildId);

            this.songs.push(songInfo);
        },

        async deleteSong(number) {
            logger('deleteSong', this.guildId);

            if(queue.songs.length > number) {
                // Deletes a song and returns it
                return queue.songs.splice(number, 1)[0];
            }
            return false;
        },

        async deleteCurrentSong() {
            logger('deleteCurrentSong', this.guildId);

            this.songs.shift();
        },

    });

    return queues.get(guildId);
}


module.exports = {
    getQueue,
    newQueue,
    extractInfo,
    deleteQueue,
    topVideos
}