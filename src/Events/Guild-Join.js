const Discord = require('discord.js')


module.exports = {
    name: Discord.Events.GuildCreate,
    type: 'on',
    id: 0,

    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;

        console.log(guild.id)



        
    }
}

const a  = 1