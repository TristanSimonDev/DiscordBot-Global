//require Components
const Discord = require('discord.js')


//define the function
module.exports = {
    async execute(message) {

        if (!(message instanceof Discord.Message)) return;

        message.reply("ich kann nichts")
    }
}