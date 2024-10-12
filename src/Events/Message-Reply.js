const Discord = require('discord.js');
const fs = require('fs');
const esprima = require('esprima');

// Load Files
let event_files = fs.readdirSync('src/Event-Functions/Message-Send').filter(file => file.endsWith('.js'));
console.log(event_files);

fs.watch('src/Event-Functions/Message-Send', (eventType, changed_file_name) => {
    if (eventType === 'change') { // Only respond to changes, not additions/removals
        
        fs.readFile(`src/Event-Functions/Message-Send/${changed_file_name}`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            // Parse the JavaScript code to check for syntax errors
            try {
                esprima.parseScript(data); // This will throw an error if there are syntax errors
                console.log(`No syntax errors found in file src/Event-Functions/Message-Send/${changed_file_name}`);

                // Clear the cache for the changed module
                delete require.cache[require.resolve(`../Event-Functions/Message-Send/${changed_file_name}`)];
                
                // Update the event_files array (optional, if you want to keep track of the latest versions)
                const index = event_files.findIndex(file => file === changed_file_name);
                if (index >= 0) {
                    event_files[index] = changed_file_name;
                }

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
