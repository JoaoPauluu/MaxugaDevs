const Discord = require('discord.js');
const fs = require('fs');

// Rewriting the code inside /functions/loadCommands.js to avoid reimporting (There should be a better way of doing this)
function loadCommands() {
    const CommandsMap = new Map();

    const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    files.forEach(file => {
        // Returns if reading this file
        if (file == 'help.js') return;

        const command = require(`../commands/${file}`)
        CommandsMap.set(command.name, command)
    })
    return CommandsMap;
}

const CommandsMap = loadCommands();

// Creates a fields array for the embed description
let fields = [];
CommandsMap.forEach((command, name) => {
    // Checks if a command has any aliases
    if(command.alias.length == 0){
        fields.push({ name: `**#${name}**`, value: `${command.description}`});
    } else {
        fields.push({ name: `**#${name}**`, value: `${command.description}\nAliases: **${command.alias.toString()}**`});
    }
})
fields.push({ name: '**#help**', value: 'Shows this'});



function command(message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: 'MaxugaDevs', iconURL: 'https://i.imgur.com/7fucFU1.png', url: 'http://bot.maxuga.ml'})
        .setColor('#ff8400')
        .setTitle('MaxugaDevs Help')
        .setURL('http://bot.maxuga.ml')
        .addFields(fields);

    message.reply({ embeds: [embed] });
}

module.exports = {
    name: 'help',
    description: 'Shows this',
    alias: [],
    perms: [],
    execute: command
}