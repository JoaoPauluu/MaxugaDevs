const Discord = require('discord.js');



async function isUserAdmin(message) {
    return await message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR);
}




module.exports = {
    isUserAdmin
}