const fs = require('fs')
const Discord = require('discord.js')
let  channel_template = require('../../../.vscode/Templates/Channel_Template').channel_template

module.exports = {
    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;

        // Create a Folder in Data\Guilds with the Guild Id
        CreateFolder_Files("Data/Guilds", guild.id)
    }
}

async function CreateFolder_Files(folderPath, Guild_Id) {

    const data_folder = fs.mkdirSync(`${folderPath}/${Guild_Id}`, { recursive: true, mode: 0o777 });
    
    fs.writeFileSync(`${data_folder}/channel_id.json`, JSON.stringify(channel_template, null, 2), 'utf8');
    
    fs.writeFileSync(`${data_folder}/users_data.json`, "{}");

    fs.writeFileSync(`${data_folder}/ticket_data.json`, "{}")
}

//let data = CreateFolder_Files("Data/Guilds", "tes34234t")