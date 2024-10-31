const Discord = require("discord.js")
const { ColorOutput } = require('../../../modules/ColorOutput');
const Permission_bits = require('../../../modules/Permission_Bits')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the Bots reaction time in ms')
    .setDefaultMemberPermissions(Permission_bits.EVERYONE),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        interaction.reply(`Ping: ${interaction.client.ws.ping}ms`)

        ColorOutput(`The user ${interaction.user.tag} - ${interaction.user.id} in Guild ${interaction.guild.name} - ${interaction.guild.id} used the ping command`).cyan()
    }
    
    

}