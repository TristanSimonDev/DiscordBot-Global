const Discord = require('discord.js')
const fs = require('fs');
const wait = require('node:timers/promises').setTimeout;



module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("add_channel")
        .setDescription("This Slashcommand is only for the Guild_Admin available, and is used to save channels in the data")
        .addStringOption(option =>
            option
                .setName("channels")
                .setDescription("Select a channel")
                .setRequired(true)
                .addChoices(
                    { name: "Announcement Channel", value: "announcement_channel" },
                    { name: "Log Channel", value: "ticket_channel" },
                    { name: "Ticket Channel", value: "log_channel" }
                )
        ),
        
    

    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;
    
        
        
    } 
}