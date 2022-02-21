const Discord = require('discord.js');



async function isUserAdmin(message) {
    const isAdmin = await message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR);
    return [isAdmin, "You don't have admin permissions on this guild"];
}

async function isUserBotCreator(message) {
    const isCreator = message.member.id == '758328146377834549';
    return [isCreator, 'You are not the creator of this bot'];
}




module.exports = {
    isUserAdmin,
    isUserBotCreator
}