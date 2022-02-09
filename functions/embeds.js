const Discord = require('discord.js');
const mainColor = '#ff8400'


function simpleEmbed(content, color = mainColor, fullMessage = true) {
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(content);

    if(fullMessage) return { embeds: [embed]};
    return embed
}

function titleEmbed(title, content, color = mainColor, fullMessage = true) {
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(content);
        
    if(fullMessage) return { embeds: [embed]};
    return embed
}

function queueEmbed(songs) {
    let description = '';

    for(let i=0; i<songs.length; i++){
        const song = songs[i];
        if(i == 0) {
            description += `**#${i}** ${song.title} ** (Currently Playing) **\n`;
        } else {
            description += `**#${i}** ${song.title}\n`;
        }
    }

    /*
    songs.forEach( song => {
        description += `${song.title}\n`;
    })
    */
    return {
        title: '**Queue**',
        color: mainColor,
        description: description
    }
}

async function searchEmbed(data) {
    let description = '';
    let counter = 1;
    data.forEach(video => {
        description += `[ ${counter} ] **${video.title}** - ${video.timestamp}\n`
        counter++;
    });
    

    return {
        title: '**Querry**',
        color: mainColor,
        description: description
    }
}


module.exports = {
    simpleEmbed,
    titleEmbed,
    queueEmbed,
    searchEmbed
}
  