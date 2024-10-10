const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const fs = require('fs')

const ColorOutput = require('../modules/ColorOutput').ColorOutput

const client = new Discord.Client({ intents: [process.env.intents] })




const EventFiles = fs.readdirSync("src/Events").filter(file => file.endsWith(".js"))

for (const file of EventFiles) {

    const Event = require(`./Events/${file}`)
    console.log(ColorOutput(`Event: ${Event.Name} with EventId ${Event.Id} loaded successfully`).green)
    client.on(Event.Name, async (...args) => Event.execute(...args))

}

client.login(process.env.TOKEN)