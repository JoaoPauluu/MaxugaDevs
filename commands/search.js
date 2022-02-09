const yts = require('yt-search');
const Queue = require('../voice/queue');
const Player = require('../voice/player');
const { simpleEmbed, searchEmbed } = require('../functions/embeds');

const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

async function clearMessagesAndPlaySong(collector, message, botMessage, song) {
    // Deletes the querry message and plays the song
    collector.stop();
    const songTitle = song.title;
    const songUrl = song.url;
    Player.handleSong(message, songUrl);
    setTimeout(() => {
        botMessage.delete();
    }, 5000);
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

    try {
        // Searches for the youtube videos and save them in an array
        const querry = args.join(' ');
        const result = await Queue.topVideos(querry);
        const finalEmbed = await searchEmbed(result);
        const botMessage = await message.reply({embeds: [finalEmbed]});
        const filter = (reaction, user) => user.id == message.member.id;
        
        // Reacts the message with the options
        let counter = 0;
        result.forEach(async function(video) {
            try {
                if (!botMessage) return;
                botMessage.react(emojis[counter]);
                counter++;
            } catch {console.log('Cannot react to message, it was probably already deleted')};
        })
        
        // Checks if the user reacts and plays the song
        const collector = await botMessage.createReactionCollector({filter, time: 30_000});
        collector.on('collect', reaction => {
            //if (reaction.author.id != message.member.id) return;
            console.log('User Reacted!');
    
            for(i=0; i<emojis.length; i++) {
                if(reaction.emoji.name == emojis[i]) {
                    console.log('Filter Matches');
                    clearMessagesAndPlaySong(collector, message, botMessage, result[i]);
                    break;
                }
            }
        })
    } catch (err) {
        console.log(err);
        message.reply(err.message);
    }

}

module.exports = {
    name: 'search',
    description: '',
    perms: '',
    execute: command
}