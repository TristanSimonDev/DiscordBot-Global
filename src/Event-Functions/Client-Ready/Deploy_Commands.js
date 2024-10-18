const { Client, Collection, Events, GatewayIntentBits } = require("discord.js")
const fs = require('fs')

module.exports = {
    async execute(client) {
        if (!(client instanceof Client)) return;

        client.commands = new Collection();

        const commandFolders = fs.readdirSync("src/Commands");

        for (const folder of commandFolders) {
        	const commandFiles = fs.readdirSync(`src/Commands/${folder}`).filter(file => file.endsWith('.js'));
        	for (const file of commandFiles) {
        		const command = require(`../../Commands/${folder}/${file}`);
        		// Set a new item in the Collection with the key as the command name and the value as the exported module
        		if ('data' in command && 'execute' in command) {
        			client.commands.set(command.data.name, command);
        		} else {
        			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        		}
        	}
        }

    }
}



