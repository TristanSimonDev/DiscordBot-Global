const Discord = require('discord.js')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const { registerFont, createCanvas, loadImage } = require('canvas');

//Establish the Connection
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

let give_xp = async (message) => {

    if (!(message instanceof Discord.Message)) return;

    const user_id = message.author.id //get the user id
    const xp_gain = Math.floor(Math.random() * 1e6 + 3) //how much xp the user gets

    db.query(`SELECT * FROM user_data WHERE user_id = ?`, [user_id], async (err, results) => {
        if (err) throw err;   

        let user = results[0];
        /*
        Results[1] will be RowDataPacket { user_id: '848247310520680489', xp: 999, level: 999 },
        but RowDataPacket get overwritten by user so its: user { user_id: '848247310520680489', xp: 999, level: 999 }
        Results will be [ RowDataPacket { user_id: '848247310520680489', xp: 999, level: 999 } ]
        nsole.log(results[0])
        */
        

        if (!user) {

            // If user not in database, create a new entry
            db.query(`INSERT INTO user_data (user_id, xp, level) VALUES (?, ?, ?)`, [user_id, xp_gain, 1]);
            user = { xp: xp_gain, level: 1 };

        } else {

            // Update user XP and check for level-up
            user.xp += xp_gain;

            const Req_XP = Math.max(1, Math.log(user.level) * (Math.sqrt(((user.level * Math.log(Math.max(2, user.level))) * user.level) / Math.log10(Math.max(2, user.level))))) * Math.max(1, Math.log(Math.log(user.level)) * Math.log10(user.level));

            let LevelBoost = (Math.log10(user.level + 1 / (user.level + 1 / Math.log(user.level) + 1)) * user.level) + 1

            let Levels = Math.floor((Math.sqrt(1 + 8 * (user.xp / Req_XP)) - 1) / 2);

            if (Levels >= 1) {
                user.level += Levels;
                user.xp = 0;

                Levels == 1 ?
                    message.channel.send(`${message.author} has leveled up to Level ${user.level}! 🎉`)
                    :
                    message.channel.send(`${message.author} has Skipped ${Levels} Levels and Juped from Level ${user.level - Levels} to Level ${user.level}! 🎉`)
                
            }

            db.query(`UPDATE user_data SET xp = ?, level = ? WHERE user_id = ?`, [user.xp, user.level, user_id]);
        }
    })
}

let infocard = (user_obj, channel) => {
    if (!(user_obj instanceof Discord.User)) return;
    if (!(channel instanceof Discord.TextChannel)) return;

    const user_id = user_obj.id

    db.query(`SELECT * FROM user_data WHERE user_id = ?`, [user_id], async (err, results) => {

        let user = results[0]

        if (!user) {

            // If user not in database, create a new entry
            db.query(`INSERT INTO user_data (user_id, xp, level) VALUES (?, ?, ?)`, [user_id, 0, 1]);
            user = { xp: 0, level: 1 };

            const attachment = await createLevelCanvas(user);
            channel.send({ files: [attachment] });

        } else { 

            const attachment = await createLevelCanvas(user);
            channel.send({ files: [attachment] });

        }
    })
}




async function createLevelCanvas(user) {
    // Set up canvas and context
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Load and draw background image
    const background = await loadImage('https://wallpapers.com/images/hd/black-desktop-background-9yrsu84fcbjv6omi.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set up text styles and draw level and XP text
    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 4;           // Width of the outline
    ctx.fillText(`Level: ${user.level}`, 200, 80);
    ctx.fillText(`XP: ${user.xp}`, 200, 120);

    // Draw XP bar
    const xpBarWidth = 250;
    const current_Xp = user.xp;
    const next_level_xp = user.level * 100;
    const progress = current_Xp / next_level_xp;
    const clampedProgress = Math.max(0, Math.min(progress, 1)); // if the progress > 1 set it to 1 so the bar dont overflow

    // Fill XP bar
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(200, 150, xpBarWidth * progress, 20);

    // Add black stroke around the XP bar
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2; // Thickness of the border
    ctx.strokeRect(200, 150, xpBarWidth, 20); // Draw stroke around the full bar width


    // Create and send attachment
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'level-card.jpg' });
    return attachment;
}


module.exports = {
    Guild_Data,
    give_xp,
    infocard
}
