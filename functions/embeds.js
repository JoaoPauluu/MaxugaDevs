const Discord = require('discord.js');
const { description } = require('../commands/nowplaying');
const mainColor = '#ff8400'


// BAD CODE DO NOT USE
function helpEmbed(fullMessage = true) {
    const embed = new Discord.MessageEmbed()
      .setColor(mainColor)
      .setTitle('Maxuga Commands')
      .setDescription("Todos os comandos do bot Maxuga")
      .setThumbnail('https://i.imgur.com/iAsK7Gb.png')
      .addFields(
        { name: 'maxuga maxuga', value: 'Manda uma linda foto do Maxuga' },
        { name: 'maxuga ednaldo pereira', value: 'Manda uma linda foto do Ednaldo Pereira' },
        { name: 'maxuga on', value: 'Ativa a feature em que o bot segue as pessoas na call (BETA)' },
        { name: 'maxuga off', value: 'Desativa a feature em que o bot segue as pessoas na call (BETA)' },
        { name: 'maxuga meme', value: 'Faz com que o bot entre na call e roda um "meme" aleatório' },
        { name: 'maxuga sussy balls', value: 'Faz com que o bot entre na call e toque "Sussy balls" por Kanye West' },
        { name: 'maxuga help', value: 'Mostra esse menu' },
      )
      .setImage('https://i.imgur.com/iAsK7Gb.png')
      .setFooter('Ajuda / reportar bugs entre em contato com JoaoPauluu#6969');
    
    if(fullMessage) return { embeds: [embed]};
    return embed
}


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
    helpEmbed,
    simpleEmbed,
    titleEmbed,
    queueEmbed,
    searchEmbed
}
  