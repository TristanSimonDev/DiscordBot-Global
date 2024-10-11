//require Components
const Discord = require('discord.js')


//define the function
module.exports = {
    async execute(client) {

        //check if the Client is an DiscordClient, when not then return and do nothing 
        if (!(client instanceof Discord.Client)) return;

        //Log the Client Info

        console.log()
    }
}