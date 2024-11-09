const Discord = require('discord.js')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const canvas = require('canvas')

let db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
});

db.connect((err) => {
    if (err) return console.error(err);
    console.log("Connected");
    db.query("CREATE TABLE IF NOT EXISTS Guild_Data (name VARCHAR(50), id VARCHAR(50))", (err, result) => {
        if (err) return console.error(err);
        console.log("Table checked/created");
    });
});

let Guild_Data = ((Guild) => {
    if (!(Guild instanceof Discord.Guild)) return;
    db.query(`Insert Into Guild_Data (name, id) VALUE (?, ?)`, [Guild.name, Guild.id], (err, res) => {
        if (err) return console.error(err);
        console.log("done");
        
    })
})  

let guild_remove = ((guild) => {
    if (!(guild instanceof Discord.Guild)) return;
})

let give_xp = (user, guild) => {
    if (!(guild instanceof Discord.Guild)) return;
    if (!(user instanceof Discord.User)) return;
}


module.exports = {
    Guild_Data
}
