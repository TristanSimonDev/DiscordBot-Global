const Discord = require('discord.js')
const fs = require('fs')

let path_to_folder = "src/Event-Functions/Client-Ready"

// Load Files
let event_files = fs.readdirSync(path_to_folder).filter(file => file.endsWith('.js'));


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