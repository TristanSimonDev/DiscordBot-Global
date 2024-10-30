//require Components
const Discord = require('discord.js')
const { ColorOutput } = require('../../../modules/ColorOutput');


//define the function
module.exports = {
    async execute(guild) {

        //check if the Client is an DiscordClient, when not then return and do nothing 
        if (!(guild instanceof Discord.Guild)) return;

        
        ColorOutput(`New Guild join detected: id : ${guild.id} | Name : ${guild.name} | Members : ${guild.memberCount}\n`).magenta()

    }
}