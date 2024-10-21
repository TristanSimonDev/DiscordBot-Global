const { error } = require('console');
const Discord = require('discord.js')
const fs = require('fs');
const { json } = require('stream/consumers');


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

        const channel_id = interaction.channel.id
        const guild_id = interaction.guild.id
        const dynamic_channel_selector = interaction.options.get("channels")?.value
        
        const data = fs.readFileSync(`./Data/Guilds/${guild_id}/channel_id.json`, 'utf8')
        const parsed_data = JSON.parse(data)

        try {

            parsed_data[dynamic_channel_selector] = channel_id

            fs.writeFileSync(`./Data/Guilds/${guild_id}/channel_id.json`, JSON.stringify(parsed_data, null, 2), 'utf-8');

            interaction.reply("tttt", {ephemeral: true})

        } catch (error) {console.error(error)}
        


        
    
    }
}