const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: Discord.Events.ClientReady,
    type: 'on',
    id: 1,

    async execute(client) {
        if (!(client instanceof Discord.Client)) return;

        const EventFiles = fs.readdirSync("src/Event-Functions/Client-Ready").filter(file => file.endsWith('.js'))


        for (const file of EventFiles) {
            const Event = require(`../Event-Functions/Client-Ready/${file}`)

            Event.execute(client)
        }



        

        
    }
}