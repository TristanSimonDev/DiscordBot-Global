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
    
        const channel_id = interaction.channel.id;
        const guild_id = interaction.guild.id;
        const guild_name = interaction.guild.name
        const dynamic_channel_selector = interaction.options.get("channels").value;
    
        const data = fs.readFileSync(`./Data/Guilds/${guild_id}-${guild_name}/channel_id.json`, 'utf8');
        const parsed_data = JSON.parse(data);
    
        const success_embed = new Discord.EmbedBuilder()
            .setDescription(`Successfully verified \`[${dynamic_channel_selector} ${channel_id}]\` in the Database`);
    
        const channel_already_added_embed = new Discord.EmbedBuilder()
            .setDescription(`The channel with ID \`${channel_id}\` is already added as ${dynamic_channel_selector}.`);
    
        try {
            // Find if the entry already exists in the parsed data
            const existingEntry = Object.entries(parsed_data).find(([key, value]) => key == dynamic_channel_selector);
    
            if (existingEntry) {
                const [key, value] = existingEntry;
    
                // If channel ID matches, send already added embed
                if (value !== "") {
                    await interaction.deferReply()
                    await wait(2_000)
                    await interaction.editReply({ embeds: [channel_already_added_embed], ephemeral: true }); 
                    
                    return 
                } else {

                    // If the key matches but the channel ID doesn't, notify and update it
                    parsed_data[dynamic_channel_selector] = channel_id;
                    fs.writeFileSync(`./Data/Guilds/${guild_id}-${guild_name}/channel_id.json`, JSON.stringify(parsed_data, null, 2), 'utf-8');
                    return interaction.reply({ embeds: [success_embed], ephemeral: true });
                    
                }
            } else {

                // If no match was found, add the new entry
                parsed_data[dynamic_channel_selector] = channel_id;
                fs.writeFileSync(`./Data/Guilds/${guild_id}-${guild_name}/channel_id.json`, JSON.stringify(parsed_data, null, 2), 'utf-8');
                return interaction.reply({ embeds: [success_embed], ephemeral: true });

            }
    
        } catch (error) {

            console.error(error);
            const error_embed = new Discord.EmbedBuilder()
                .setDescription(`Error while trying to save \`[${dynamic_channel_selector} ${channel_id}]\` in the Database`);
            return interaction.reply({ embeds: [error_embed], ephemeral: true });

        }
    }
        
    
}