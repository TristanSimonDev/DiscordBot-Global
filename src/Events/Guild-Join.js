const Discord = require('discord.js');
const fs = require('fs');
const esprima = require('esprima');


let path_to_folder = "src/Event-Functions/Guild-Add"

//load files
let event_files = fs.readdirSync(path_to_folder).filter(file => file.endsWith('.js'));




module.exports = {
    name: Discord.Events.GuildCreate,
    type: 'on',
    id: 0,

    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;

        for (const file of event_files) {
            const Event = require(`../Event-Functions/Guild-Add/${file}`)

            Event.execute(guild)

            
        }



        
    }
}
