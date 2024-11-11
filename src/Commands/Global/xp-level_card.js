const Discord = require("discord.js")
const { ColorOutput } = require('../../../modules/ColorOutput');
const Permission_bits = require('../../../modules/Permission_Bits')
const db = require('../../../Data/Sql/DataBase')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('level_card')
        .setDescription('Shows your Level and the XP')
    .setDefaultMemberPermissions(Permission_bits.EVERYONE),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        db.infocard(interaction.user, interaction.channel)

        ColorOutput(`The user ${interaction.user.tag} - ${interaction.user.id} in Guild ${interaction.guild.name} - ${interaction.guild.id} used the level_card command`).cyan()
    }
}