const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv').config()
const { ColorOutput } = require('../../../modules/ColorOutput');


module.exports = {
	async execute(client) {
        const commands = [];
        // Grab all the command folders from the commands directory you created earlier
        const commandFolders = fs.readdirSync('src/Commands');
        
        for (const folder of commandFolders) {
        
        	// Grab all the command files from the commands directory you created earlier
            const commandFiles = fs.readdirSync(`src/Commands/${folder}`).filter(file => file.endsWith('.js'));
            
        	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        	for (const file of commandFiles) {
        		const command = require(`../../Commands/${folder}/${file}`);
        		if ('data' in command && 'execute' in command) {
        			commands.push(command.data.toJSON());
        		} else {
        			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        		}
        	}
        }
        
        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(process.env.TOKEN);
        
        // and deploy your commands!
        (async () => {
        	try {
        		ColorOutput(`Started refreshing ${commands.length} application (/) commands.`).yellow();
        
        		// The put method is used to fully refresh all commands in the guild with the current set
        		const data = await rest.put( // clientid / guildid
        			Routes.applicationCommands("1293981957079961651", process.env.TOKEN),
        			{ body: commands },
        		);
        
        		ColorOutput(`Successfully reloaded ${data.length} application (/) commands.`).green();
        	} catch (error) {
        		// And of course, make sure you catch and log any errors!
        		console.error(error);
        	}
        })();

	}
}
