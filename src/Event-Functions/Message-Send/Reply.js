//require Components
const Discord = require('discord.js')
const db = require('../../../Data/Sql/DataBase')


//define the function
module.exports = {
    async execute(message) {

        if (!(message instanceof Discord.Message)) return;
        if (message.author.bot) return;

        db.give_xp(message)
    }
}