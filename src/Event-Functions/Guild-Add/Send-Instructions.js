const Discord = require('discord.js');
const { type } = require('os');


module.exports = {
    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;


        // Create a category
        const category = await guild.channels.create({
            name: "help",
            type: Discord.ChannelType.GuildCategory
        });

        // Create a text or announcement channel within the category
        const tutorial_channel = await guild.channels.create({
            name: "tutorial-nova",
            type: Discord.TextChannel, // Announcement channel (or change to 'GuildText' for a text channel)
            parent: category.id // Set the parent to the category you just created
        });

        const greeting = new Discord.EmbedBuilder()
            .setTitle("Thanks for using Nova bot")
            .setDescription(
                `1 --> Commands`
        )
        
        const commands = new Discord.EmbedBuilder()
            .setTitle('Available Commands')

        const tutorial_embeds = [greeting, commands]

        await tutorial_channel.send({ embeds: [...tutorial_embeds] })




        
    }
}