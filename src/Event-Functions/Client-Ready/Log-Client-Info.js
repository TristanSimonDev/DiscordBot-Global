//require Components
const Discord = require('discord.js')


//define the function
module.exports = {
    async execute(client) {

        //check if the Client is an DiscordClient, when not then return and do nothing 
        if (!(client instanceof Discord.Client)) return;

        //defiene the Client-Info-Output in an 2 arry output 
        const client_info = [
            [],
            [],
            ["Tag:", client.user.tag],
            [],
            [],
            [],
            [],
            [],
        ]

        //Use foreach to log the single arrays
        client_info.forEach(info_array => {
            console.log(...info_array)
        })
    }
}