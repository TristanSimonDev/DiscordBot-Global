const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')

module.exports = {
    async execute(guild) {
        if (!(guild instanceof Discord.Guild)) return;

        // Create a Folder in Data\Guilds with the Guild Id
        CreateFolder_Files("Data/Guilds", guild.id)
    }
}

async function CreateFolder_Files(folderPath, Guild_Id) {

    const data_folder = fs.mkdirSync(`${folderPath}/${Guild_Id}`, { recursive: true, mode: 0o777 });
    
    fs.writeFileSync(`${data_folder}/channels.json`,
`{
    "announcement_channel": "",
    "ticket_channel": ""
}`);
    
    fs.writeFileSync(`${data_folder}/users.json`, "{}");
}

let data = CreateFolder_Files("Data/Guilds", "tes34234t")