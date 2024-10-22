const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the Bots reaction time in ms'),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        interaction.reply(`Ping: ${interaction.client.ws.ping}`)

    }
    
    

}