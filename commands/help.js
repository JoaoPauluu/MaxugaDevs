const { helpEmbed, simpleEmbed } = require('../functions/embeds');

function command(message) {
    message.channel.send(simpleEmbed('Esse bot ta sem ajuda ainda vai se fuder'));
}

module.exports = {
    name: 'help',
    description: '',
    perms: '',
    execute: command
}