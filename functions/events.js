const { simpleEmbed } = require('./embeds');

// Runs when a message is sent
async function messageCreated(message, CommandsMap, prefix) {
    if(!message.content.startsWith(prefix)) return;

    // args has all the words after the command | command is the first word typed by the user after the prefix
    args = message.content.slice(prefix.length).trim().split(/\s+/);
    command = args.shift();

    // Returns if the command doesn't exist
    if(!CommandsMap.has(command)) {
        message.reply(simpleEmbed('Esse comando não existe', '#ff0000'));
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