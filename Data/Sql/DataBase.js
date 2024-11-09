const Discord = require('discord.js')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const { registerFont, createCanvas, loadImage } = require('canvas');

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
    const now = Date.now() //get the timestamp

    const xp_gain = Math.floor(Math.random() * 10 + 3)

    db.query(`SELECT * FROM user_data WHERE user_id = ?`, [user_id], async (err, results) => {
        if (err) throw err;

        //create profile card
        

        let user = results[0];
        console.log(results)

        if (!user) {
            // If user not in database, create a new entry
            db.query(`INSERT INTO user_data (user_id, xp, level) VALUES (?, ?, ?)`, [user_id, xp_gain, 1]);
            user = { xp: xp_gain, level: 1 };

        } else {

            // Update user XP and check for level-up
            user.xp += xp_gain;
            let newLevel = user.level;

            // Level-up formula (example: level * 100 XP for next level)
            const Req_XP = (Math.log10(user.level + 1 / (user.level + 1 / Math.log(user.level) + 1)) * user.level) + 1;

            if (user.xp >= Req_XP) {
                newLevel++;
                user.xp -= Req_XP;
                message.channel.send(`${message.author} has leveled up to Level ${newLevel}! 🎉`);
            }

            db.query(`UPDATE user_data SET xp = ?, level = ? WHERE user_id = ?`, [user.xp, newLevel, user_id]);
            const attachment = await createLevelCanvas(user);
            message.channel.send({ files: [attachment] });
        }
    })
}




async function createLevelCanvas(user) {
    // Set up canvas and context
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Load and draw background image
    const background = await loadImage('https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set up text styles and draw level and XP text
    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Level: ${user.level}`, 200, 80);
    ctx.fillText(`XP: ${user.xp}`, 200, 120);

    // Draw XP bar
    const xpBarWidth = 400;
    const currentLevelXp = user.level * (Math.log10(user.level + 1 / (user.level + 1 / Math.log(user.level) + 1)) * user.level) + 1
    const normalizedXp = user.xp % currentLevelXp; // XP within the current level
    const progress = normalizedXp / currentLevelXp;
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(200, 150, xpBarWidth * progress, 20); //with * progress needs too get debugged

    // Create and send attachment
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'level-card.jpg' });
    return attachment;
}


module.exports = {
    Guild_Data,
    give_xp
}
