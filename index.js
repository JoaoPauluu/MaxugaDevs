// Prefix and token of the bot
const prefix = '##';
const token = 'ODg4OTM4NDYxNjY1NTY2NzQy.YUZ-dA.CzMPo4dCujZThwiIOOrjYOvN3dE';

// Importing dependencies
const { Client, Intents, ClientVoiceManager } = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const events = require('./functions/events');
const { loadCommands } = require('./functions/loadCommands');

// Creating the client object and the CommandsMap
const CommandsMap = loadCommands();

// Creating the client object with right intents
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });



// Runs when the bot starts
client.once('ready', async () => { events.clientReady(client) });

// Runs when there's a message sent
client.on('messageCreate', async message => { events.messageCreated(message, CommandsMap, prefix) });



client.login(token);
