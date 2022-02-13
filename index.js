// Prefix and token of the bot
const prefix = '#';
const token = process.env.BOT_TOKEN;

// Importing dependencies
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const events = require('./functions/events');
const { loadCommands } = require('./functions/loadCommands');

// Creating the client object and the CommandsMap
const CommandsMap = loadCommands();

// Importing the client object
const { client } = require('./client');



// Runs when the bot starts
client.once('ready', async () => { events.clientReady(client) });

// Runs when there's a message sent
client.on('messageCreate', async message => { events.messageCreated(message, CommandsMap, prefix) });



client.login(token);
