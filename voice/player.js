const Voice = require('@discordjs/voice');
const pldl = require('play-dl');
const Queue = require('./queue');
const { simpleEmbed } = require('../functions/embeds');

pldl.setToken({
    useragent: [process.env.USER_AGENT]
});

function logger(functionName, guildId) {
    console.log(`Exec: ${functionName} at: ${guildId}`);
    return;
}

async function configurePlayerAndConnection(guildId) {
    logger('configurePlayerAndConnection', guildId);

    const queue = await Queue.getQueue(guildId);
    const connection = queue.connection;
    const player = queue.player;

    player.on('stateChange', async (oldState, newState) => {
        if(oldState.status == Voice.AudioPlayerStatus.Playing && newState.status == Voice.AudioPlayerStatus.Idle) {
            // Runs when a song finishes
            console.log(`Connection at ${guildId} changed to: Idle`);
            queue.deleteCurrentSong();

            if(queue.songs.length == 0) {
                // Runs when there are no more songs on the queue
                logger(`No more songs in queue at: ${guildId}`);
                queue.playing = false;
                queue.timeout = setTimeout(() => {
                    logger(`Deleting queue due to Timeout at: ${guildId}`);
                    Queue.deleteQueue(guildId);
                }, 240000)
                return;
            } else {
                // If there are songs in the queue, this function will be ran
                playSong(guildId);
                return;
            }

        }
    }) 
}

async function playSong(guildId) {
    // Starts playing the first song on a queue
    logger('playSong', guildId);

    const queue = await Queue.getQueue(guildId);

    if(!queue.playing) {
        // Checks if the bot was playing something before. If not, cancels the 
        // disconnect timeout and sets playing to true.
        logger('playSong (queue was not playing)', guildId);
        queue.playing = true;
        clearTimeout(queue.timeout);
    }
    const url = queue.songs[0].url;

    try {
        console.log('========== ATTACHING PLAYER ===============');
        const stream = await pldl.stream(url, {discordPlayerCompatibility: true});
        const resource = Voice.createAudioResource(stream.stream, {
            inputType: stream.type
        })
        await queue.player.play(resource);
    } catch (e) {
        console.log(e);
        queue.deleteCurrentSong();
        return;
    }
}


async function handleSong(message, url) {
    logger('handleSong', url);

    const guildId = message.guild.id;
    let queue = await Queue.getQueue(guildId);
    let songInfo;
    try {
        songInfo = await Queue.extractInfo(url);
    } catch (e) {
        console.log(e);
        message.reply(e.message);
        return;
    }

    if(queue == null) {
        //Runs if there's no queue
        logger('handleSong (No queue)', url);

        queue = await Queue.newQueue(message);
        await configurePlayerAndConnection(guildId);
        await queue.addSongToQueue(songInfo);
        await playSong(guildId);
        message.reply(simpleEmbed(`Now playing **${songInfo.title}!**`));
        return;
    } 
    if(queue) {
        if(!queue.playing) {
            logger('handleSong (Has queue | Not playing)', url);
            queue.addSongToQueue(songInfo);
            playSong(guildId);
            message.reply(simpleEmbed(`Now playing **${songInfo.title}!**`));
            return;
        }
        if(queue.playing) {
            logger('handleSong (Has queue | Playing)', url);
            queue.addSongToQueue(songInfo);
            message.reply(simpleEmbed(`**${songInfo.title}** added to the queue!`));
            return;
        }
    }
}




module.exports = {
    handleSong
}