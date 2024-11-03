const Discord = require('discord.js')
const fs = require('fs');
const wait = require('node:timers/promises').setTimeout;



module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("delete_channels")
        .setDescription("This command will the delete all your channels you saved")
        .addStringOption(option =>
            option
                .setName("delete_channels")
                .setDescription("Are you sure?")
                .setRequired(true)
                .addChoices(
                    { name: "Yes", value: "Yes" },
                    { name: "No", value: "No" },
                )
        ),
        
    

    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        
        
    }
        
    
}