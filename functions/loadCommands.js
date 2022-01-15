const fs = require('fs');


function loadCommands() {
    const CommandsMap = new Map();

    const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    files.forEach(file => {
        const command = require(`../commands/${file}`)
        CommandsMap.set(command.name, command)
    })
    return CommandsMap;
}

module.exports = {
    loadCommands
}


