const Discord = require('discord.js');
const fs = require('fs');
const esprima = require('esprima');

//the path to the folder you want to keep track of
let path_to_folder = "src/Event-Functions/Message-Send"

// Load Files
let event_files = fs.readdirSync(path_to_folder).filter(file => file.endsWith('.js'));

//watch the files in the dir
fs.watch(path_to_folder, (eventType, changed_file_name) => {
    if (eventType === 'change' || 'rename') { // Only respond changes and new files or rename
        
        //read the file that got changed
        fs.readFile(`${path_to_folder}/${changed_file_name}`, 'utf8', (err, data) => {

            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            // Parse the JavaScript code to check for syntax errors
            try {
                esprima.parseScript(data); // This will throw an error if there are syntax errors
                console.log(`No syntax errors found in file ${path_to_folder}/${changed_file_name}`);

                // Clear the cache for the changed module
                delete require.cache[require.resolve(`../Event-Functions/Message-Send/${changed_file_name}`)];
                
                //The event_files.findIndex(file => file === changed_file_name)
                event_files[event_files.findIndex(file => file === changed_file_name)] = changed_file_name;

            } catch (parseErr) {
                console.error('Syntax error detected:', parseErr.message);
            }
            
        });
    }
});



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
