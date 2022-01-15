const Voice = require('@discordjs/voice');
//const { getURLVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const Queue = require('./queue');
const Embeds = require('../functions/embeds');

async function playSong(message = null, url = null, id = null) {
    try {
        // Checks from wich paramter guildId should be used
        let guildId = null;
        if(message != null) {
            guildId = message.guild.id;
        }
        if(id != null){
            guildId = id;
        }
    
        // If no song parameter is passed, it deletes de Queue for the Guild and stops the reccuring function loop
        if(url == null) {
            console.log('DELETING QUEUE')
            const queue = await Queue.getQueue(guildId);
            await queue.connection.destroy();
            await Queue.deleteQueue(guildId);
            return;
        }
    
        // Checks if a queue for a guild already exists
        const hasQueue = await Queue.hasQueue(guildId);
    
        // Runs if such guild already has a queue
        if(hasQueue == true) {
            console.log('RUNNING HAS QUEUE');
            const queue = await Queue.getQueue(guildId);
            // If no song is playing, then it starts playing input song immediately
            if(!queue.playing) {
                const stream = ytdl(url, { filter: 'audioonly' });
                const player = queue.player;
                const resource = Voice.createAudioResource(stream);
                const  connection = queue.connection;
                player.play(resource);
                await Queue.playing(guildId, true);
            } else{
                // If a song is already playing, the input song will be added to the queue
                const songInfo = await Queue.extractInfo(url);
                await Queue.addSongToQueue(guildId, songInfo);
                message.reply(Embeds.simpleEmbed(`**${songInfo.title}** added to queue!`));
            }
        }
    
        // Runs if such guild doesn't have a queue
        if(hasQueue == false) {
            console.log("RUNNING DOESNT HAVE QUEUE");
            const stream = ytdl(url, { filter: 'audioonly' });
            const player = Voice.createAudioPlayer();
            const resource = Voice.createAudioResource(stream);
            const connection = Voice.joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
    
            player.play(resource);
            connection.subscribe(player);
    
            await Queue.newQueue(guildId, message, connection, player);
            await Queue.playing(guildId, true);
    
    
            //Queue.setCurrentSong(guildId, songInfo);
            const songInfo = await Queue.extractInfo(url);
            message.reply(Embeds.simpleEmbed(`Now Playing **${songInfo.title}**`));
    
            player.on('stateChange', async (oldState, newState) => {
                if(newState.status === Voice.AudioPlayerStatus.Idle){
                    // Runs when a song finishes playing
                    console.log('STATE CHANGED TO IDLE');
                    let nextSong = await Queue.getNextSong(guildId);
                    await Queue.playing(guildId, false);
                    // If there is a next song in the queue, recalls this function with that song, otherwise, null will be passed as url
                    if(nextSong) playSong(null, nextSong.url, guildId);
                    if(!nextSong) playSong(null, null, guildId);
                    
                }
            })
        }

    } catch(e) {
        message.reply(e.message);
        console.log(e);
    }
}

module.exports = {
    playSong
}