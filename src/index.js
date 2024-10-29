// Required modules
const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { ColorOutput } = require('../modules/ColorOutput');


//--------------------------------------------------------------------Client Events

const client = new Discord.Client({ intents: [process.env.intents] })

const EventFiles = fs.readdirSync("src/Events").filter(file => file.endsWith(".js"))

for (const file of EventFiles) {

    const Event = require(`./Events/${file}`)

    ColorOutput(`Event: [${Event.name}] with EventId [${Event.id}] loaded successfully`).green()
    client[Event.type](Event.name, async (...args) => Event.execute(...args))
}

//----------------------------------------------------------------------------


// Set up Express server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
    const filePath = path.join(__dirname,'../Web/Admin.html'); // Use absolute path
    res.sendFile(filePath);
});

// Route to receive the message from the HTML form
app.post('/send-message', async (req, res) => {
    const message = req.body.message;

    try {
        const channel = await client.channels.fetch("1298641564712829010"); // Replace with your channel ID
        await channel.send(message);
        res.send('Message sent to Discord!');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message to Discord.');
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

client.login(process.env.TOKEN)
.then(() => {
    ColorOutput( 
        `\n=== Bot Login Info ===` +
        `\n\nToken Length:                   ${process.env.TOKEN.length}` +
        `\nNode Version:                   ${process.version}` +
        `\nDevice Architecture:            ${process.arch}` +
        `\nDiscord.js Version:             ${require("discord.js").version}` +
        `\nOS:                             ${process.platform}` +
        `\nUptime:                         ${Math.floor(process.uptime())} seconds` +
        `\nMemory Used:                    ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB` +
        `\nStatus: Working [${client.user.tag}] => Logged in Successfully\n`
    ).blue()
})
.catch((error) => {

    ColorOutput(
        `\n=== Bot Login Info ===` +
        `\n\nToken Length:                   ${process.env.TOKEN.length}` +
        `\nNode Version:                   ${process.version}` +
        `\nDevice Architecture:            ${process.arch}` +
        `\nDiscord.js Version:             ${require("discord.js").version}` +
        `\nOS:                             ${process.platform}` +
        `\nUptime:                         ${Math.floor(process.uptime())} seconds` +
        `\nMemory Used:                    ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB` +
        `\nStatus: Failed [ERROR] => Login failed\n`
        ).red()
    console.error(`Error Details: ${error.message}`); // Log the error details for debugging
});

