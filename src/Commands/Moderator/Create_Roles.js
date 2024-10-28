const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('template_create_role')
        .setDescription("This command will create template roles that have their own color!")
        .addStringOption(option => 
            option   
                .setName('role_name')
                .setDescription("what role name do you want to choose?")
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
    )
        .addStringOption(option => 
            option   
                .setName('role_color')
                .setDescription("what role color do you want to choose?")
                .addChoices(
                    { name: "Red", value: "#FF0000" },
                    { name: "Orange", value: "#FFA500" },
                    { name: "Yellow", value: "#FFFF00" },
                    { name: "Green", value: "#008000" },
                    { name: "Blue", value: "#0000FF" },
                    { name: "Purple", value: "#800080" },
                    { name: "Pink", value: "#FFC0CB" },
                    { name: "Teal", value: "#008080" },
                    { name: "Cyan", value: "#00FFFF" },
                    { name: "Magenta", value: "#FF00FF" },
                    { name: "Brown", value: "#A52A2A" },
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" },
                    { name: "Gray", value: "#808080" }
            )
        ),
        
    async execute(interaction) {
        if (!(interaction instanceof Discord.CommandInteraction)) return;

        const role_name = interaction.options.get("role_name").value
        const role_color = interaction.options.get("role_color").value

        interaction.guild.roles.create({
            name: role_name,
            color: role_color
        })


    }
}