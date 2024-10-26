const Discord = require("discord.js")
const { ColorOutput } = require('../../../modules/ColorOutput')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the Bots reaction time in ms'),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        interaction.reply(`Ping: ${interaction.client.ws.ping}`)

        ColorOutput(`The user ${interaction.user.tag} - ${interaction.user.id} in Guild ${interaction.guild.name} - ${interaction.guild.id} used the ping command`).cyan()
    }
    
    

}