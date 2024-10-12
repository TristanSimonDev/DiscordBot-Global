const Discord = require('discord.js')
const fs = require('fs')
const esprima = require("esprima")

//Load Files
let event_files = fs.readdirSync("src/Event-Functions/Client-Ready").filter(file => file.endsWith('.js'))
console.log(event_files)

fs.watch("src/Event-Functions/Client-Ready", (dumb_message_that_no_one_needs, changed_file_name) => {

    fs.readFile(`src/Event-Functions/Client-Ready/${changed_file_name}`, 'utf8', (err, data) => {

        if (err) {
            console.error('Error reading file:', err);
        }
        
        // Parse the JavaScript code to check for syntax errors
        try {

            esprima.parseScript(data); // This will throw an error if there are syntax errors
            console.log(`No syntax errors found on file src/Event-Functions/Client-Ready/${changed_file_name}`);

            const Index = event_files.findIndex((file) => file == changed_file_name)
            event_files[Index] = changed_file_name

        } catch (parseErr) {
            console.error('Syntax error detected:', parseErr.message);
        }

    });
    
});

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