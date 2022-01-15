const Voice = require('@discordjs/voice');
//const { getURLVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const Queue = require('./queue');
const Embeds = require('../functions/embeds');

async function playSong(message, guildId, url) {
    try {
        const hasQueue = await Queue.hasQueue(guildId);

        if(!url) {
            console.log('Running doesnt have url');
            const queue = await Queue.getQueue(guildId);
            if(queue.songs.length == 0) {
                // Destroys the player and queue
                console.log('Running no songs in queue');
                queue.connection.destroy();
                Queue.deleteQueue(guildId);
                return;
            }
            if(queue.songs.length > 0) {
                // Plays first song from the queue
                console.log('Running has song in queue');
                const songUrl = queue.songs[0].url;
                const stream = ytdl(songUrl, { filter: 'audioonly' });
                const resource = Voice.createAudioResource(stream);
                const player = queue.player;
                player.play(resource);
                return;
            }
        }
        if(url) {
            console.log('Running has url');
            const songInfo = await Queue.extractInfo(url);
            if(hasQueue) {
                // Adds song to the end of the queue
                console.log('Running has queue');
                await Queue.addSongToQueue(guildId, songInfo);
                message.reply(Embeds.simpleEmbed(`**${songInfo.title}** added to the Queue!`));
                return;
            }
            if(!hasQueue) {
                // Plays given song (creates a pleyer, connection and queue,
                // Adds song to the first position on that queue and recalls this function without an url)
                console.log('Running doest have queue');
                const player = Voice.createAudioPlayer();
                const connection = Voice.joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                })

                connection.subscribe(player);
                await Queue.newQueue(guildId, message, connection, player);
                await Queue.addSongToQueue(guildId, songInfo);

                player.on('stateChange', async (oldState, newState) => {
                    if(oldState.status == Voice.AudioPlayerStatus.Playing && newState.status === Voice.AudioPlayerStatus.Idle) {
                        // Runs every time the player finishes a song
                        console.log('===State chaning to idle===');
                        Queue.deleteCurrentSong(guildId);
                        playSong(message, guildId);
                    }
                })
                message.reply(Embeds.simpleEmbed(`Playing **${songInfo.title}**`));
                playSong(message, guildId);
            }
        }

    } catch(e) {
        message.reply(e.message);
        console.log(e);
    }
}

module.exports = {
    playSong
}