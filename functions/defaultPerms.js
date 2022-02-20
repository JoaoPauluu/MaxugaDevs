const Discord = require('discord.js');



async function isUserAdmin(message) {
    return await message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR);
}

async function isUserBotCreator(message) {
    return message.member.id == '758328146377834549';
}




module.exports = {
    isUserAdmin,
    isUserBotCreator
}