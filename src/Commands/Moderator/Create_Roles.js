const { exec } = require('child_process')
const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('create_role')
        .setDescription("This command will create a new discord role")
        .addStringOption(),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        
    }
}