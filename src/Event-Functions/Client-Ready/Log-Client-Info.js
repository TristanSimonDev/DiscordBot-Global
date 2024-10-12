//require Components
const Discord = require('discord.js')


//define the function
module.exports = {
    async execute(client) {

        //check if the Client is an DiscordClient, when not then return and do nothing 
        if (!(client instanceof Discord.Client)) return;

        console.log(client.user)

        //defiene the Client-Info-Output in an 2 arry output 
        const client_info = [
            ["Username:", client.user.username],
            ["Id:", client.user.id],
            ["Tag:", client.user.tag],
            [],
            [],
            ["Avatar-Hash:", client.user.avatar],
            ["Verified:", client.user.verified],
            ["Bot?", client.user.bot],
        ]

        //Use foreach to log the single arrays
        client_info.forEach(info_array => {
            console.log(...info_array)
        })
    }
}