const Discord = require('discord.js');
const { type } = require('os');


module.exports = {
    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;


        //Create Category

        const category = await guild.channels.create({
            name: "help",
            type: Discord.ChannelType.GuildCategory
        })

        const tutorial_channel = await guild.channels.create({
            name: "tutorial-nova",
            parent: category.id,
            type: Discord.ChannelType.GuildAnnouncement
        })




    }
}