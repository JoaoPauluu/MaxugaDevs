const { simpleEmbed } = require('./embeds');

// Runs when a message is sent
async function messageCreated(message, CommandsMap, prefix) {
    if(!message.content.startsWith(prefix)) return;

    // args has all the words after the command | command is the first word typed by the user after the prefix
    args = message.content.slice(prefix.length).trim().split(/\s+/);
    command = args.shift();

    // Runs if the command is not called by it's full name or doesn't exist
    if(!CommandsMap.has(command)) {
        // Iterate through the commands and check for aliases
        let aliasFound = false;

        CommandsMap.forEach(async (commandFunction, commandName) => {
            for(const alias of commandFunction.alias) {
                if(command == alias) {
                    CommandsMap.get(commandName).execute(message, args);
                    aliasFound = true;
                    return;
                }
            }
            return;
        })

        if(aliasFound) return;

        message.reply(simpleEmbed("This command doesn't exist, type #help for a full list of commands", '#ff0000'));
        return;
    }

    // Runs the command
    CommandsMap.get(command).execute(message, args);

}

// Runs when the client is ready
async function clientReady(client) {
    console.log('Ready!');

    // Sets the bot status
    await client.user.setActivity('#help', {
        status: 'online',
        activity: {
            name: 'activity',
            type: 'listening'
        }
    })
}



module.exports = {
    messageCreated,
    clientReady
}