const Discord = require('discord.js')


module.exports = {
    name: Discord.Events.InteractionCreate,
    type: 'on',
    id: 3,

    async execute(interaction) {
        if (interaction instanceof Discord.ChatInputCommandInteraction) {
            const Event = require('../Event-Functions/Interaction/SlashCommand-Interaction')
            Event.execute(interaction)
        }

        



        
    }
}