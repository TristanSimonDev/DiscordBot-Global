const Discord = require('discord.js')


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("add_channel")
        .setDescription("This Slashcommand is only for the Guild-Admin available, and is used to save channels in the data"),

    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;
        interaction.reply("nice")
    }
}