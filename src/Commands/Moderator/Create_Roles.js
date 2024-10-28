const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('create_role')
        .setDescription("This command will create a new discord role")
        .addStringOption(option => 
            option   
                .setName('role_name')
                .setDescription("the name for your role")
                .addChoices(
                    { name: "Admin", value: "Admin" },
                    { name: "Moderator", value: "Moderator" },
                    { name: "Member", value: "Member" },
                    { name: "VIP", value: "VIP" },
                    { name: "Newbie", value: "Newbie" },
                    { name: "Veteran", value: "Veteran" },
                    { name: "Support", value: "Support" },
                    { name: "Helper", value: "Helper" },
                    { name: "Guardian", value: "Guardian" },
                    { name: "Champion", value: "Champion" }
                )
        ),
    
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;



    }
}