const Discord = require('discord.js')
const sql = require('../../../Data/Sql/DataBase')

module.exports = {
    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;

        sql.Guild_Data(guild)
    }
}
