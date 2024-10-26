const Discord = require('discord.js')
const fs = require('fs');
const { channel_template } = require('../../../.vscode/Templates/Channel_Template');
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

        const guild_id = interaction.guild.id
        const option = interaction.options.get("delete_channels").value

        let data = fs.readFileSync(`./Data/Guilds/${guild_id}/channel_id.json`, 'utf8');
        let parsed_data = JSON.parse(data);

        const success_embed = new Discord.EmbedBuilder()
            .setDescription("Succesfully cleared channel_id Data")
        
        const not_deleted_embed = new Discord.EmbedBuilder()
            .setDescription("They interrupted the process")

        try {

            if (option == "Yes") {
                
                //write the empty template
                parsed_data = channel_template
                fs.writeFileSync(`./Data/Guilds/${guild_id}/channel_id.json`, JSON.stringify(parsed_data, null, 2), 'utf-8')

                //show Nova is thinking...
                await interaction.deferReply()
                //wait 2s
                await wait(2_000)
                //send the embed after 2 seconds
                await interaction.editReply({ embeds: [success_embed], ephemeral: true });

            } else {
                //if the awnser is no just return
                return
    
            }

        } catch (err) {console.error(err)}
        
    }
        
    
}