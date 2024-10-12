const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const fs = require('fs')

const ColorOutput = require('../modules/ColorOutput').ColorOutput

const client = new Discord.Client({ intents: [process.env.intents] })

const EventFiles = fs.readdirSync("src/Events").filter(file => file.endsWith(".js"))

for (const file of EventFiles) {

    const Event = require(`./Events/${file}`)

    console.log(ColorOutput(`Event: [${Event.name}] with EventId [${Event.id}] loaded successfully`).green)
    client[Event.type](Event.name, async (...args) => Event.execute(...args))
}



client.login(process.env.TOKEN)
.then(() => {
    console.log(
        ColorOutput(
            `\n=== Bot Login Info ===` +
                `\n\nToken Length:                 ${process.env.TOKEN.length}` +
                `\nNode Version:                   ${process.version}` +
                `\nDevice Architecture:            ${process.arch}` +
                `\nDiscord.js Version:             ${
                    require("discord.js").version
                }` +
                `\nOS:                             ${process.platform}` +
                `\nUptime:                         ${Math.floor(
                    process.uptime()
                )} seconds` +
                `\nMemory Used:                    ${Math.round(
                    (process.memoryUsage().heapUsed / 1024 / 1024) * 100
                ) / 100} MB` +
                `\nStatus: Working [${client.user.tag}] => Logged in Successfully\n`
        ).magenta
    );
})
.catch((error) => {
    console.log(
        ColorOutput(
            `\n=== Bot Login Info ===` +
                `\n\nToken Length:                  ${process.env.TOKEN.length}` +
                `\nNode Version:                   ${process.version}` +
                `\nDevice Architecture:            ${process.arch}` +
                `\nDiscord.js Version:             ${
                    require("discord.js").version
                }` +
                `\nOS:                             ${process.platform}` +
                `\nUptime:                         ${Math.floor(
                    process.uptime()
                )} seconds` +
                `\nMemory Used:                    ${Math.round(
                    (process.memoryUsage().heapUsed / 1024 / 1024) * 100
                ) / 100} MB` +
                `\nStatus: Failed [ERROR] => Login failed\n`
        ).red
    ); // Changed to red for errors
    console.error(`Error Details: ${error.message}`); // Log the error details for debugging
});

