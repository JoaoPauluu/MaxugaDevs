const prefix = '00';
const token = 'ODg4OTM4NDYxNjY1NTY2NzQy.YUZ-dA.CzMPo4dCujZThwiIOOrjYOvN3dE';

const { Client, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

client.once('ready', async () => {
    console.log('Ready!');
    await client.user.setActivity('Simplesmente Maxuga Gay',{
        status: 'online',
        activity: {
          name: 'prefix: maxdev',
          type: 'PLAYING'
        }
      })
})


client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix)) return;
    command = message.content.slice(prefix.length).trim();
    console.log(command);

    if(command.startsWith('test')) {

        if(!message.attachments.size > 0) message.channel.send('Message has no attachments');
        const url = message.attachments.first().url;
        console.log(await fetch(url));



        
        // console.log(message.attachments.first().url);
        // console.log(message.attachments.first().proxyURL);
        // console.log(message.attachments.first());
    }
})














client.login(token);