const Discord = require('discord.js')
const fs = require('fs')

// Load Files
let event_files = fs.readdirSync("src/Event-Functions/Client-Ready").filter(file => file.endsWith('.js'));


module.exports = {
    name: Discord.Events.ClientReady,
    type: 'on',
    id: 1,

    async execute(client) {
        if (!(client instanceof Discord.Client)) return;

        


        for (const file of event_files) {
            const Event = require(`../Event-Functions/Client-Ready/${file}`)

            Event.execute(client)
        }



        

        
    }
}