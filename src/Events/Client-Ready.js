const Discord = require('discord.js')

module.exports = {
    Name: Discord.Events.ClientReady,
    Type: 'on',
    EventId: 1,

    async execute(client) {
        if (!(client instanceof Discord.Client)) return;

        console.log(client.user.tag)

        
    }
}