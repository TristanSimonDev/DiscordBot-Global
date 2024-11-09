const Discord = require('discord.js');
const fs = require('fs');
const esprima = require('esprima');


let path_to_folder = "src/Event-Functions/Message-Send"

// Load Files
let event_files = fs.readdirSync(path_to_folder).filter(file => file.endsWith('.js'));


module.exports = {
    name: Discord.Events.MessageCreate,
    type: 'on',
    id: 2,

    async execute(message) {
        if (!(message instanceof Discord.Message)) return;
        if (message.author.bot) return;

        for (const file of event_files) {

            // Re-require the module each time to get the latest version
            const Event = require(`../Event-Functions/Message-Send/${file}`);
            await Event.execute(message); // Ensure this is awaited if Event.execute is async
        }
    }
};
