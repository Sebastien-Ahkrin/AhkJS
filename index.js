const fs = require("fs");

const app = require('./main.js');

const discord = require('discord.js');
const client = new discord.Client();

client.on('message', message => app.main(message));

client.on('ready',
    () => {
        client.user.setAvatar(fs.readFileSync('./ressources/Ahk.png'), err => {
            if (err) throw err;
        });
        client.user.username = "AhkJS";

        console.log(`Logged in as ${client.user.tag}!`);
    }
);

client.on('reconnecting', () => console.log('Reconnecting'));
client.on('error', error => console.error(error));

if (process.env.DISCORD_TOKEN === undefined) {
  require('dotenv').load();
}

client.login(process.env.DISCORD_TOKEN);

global.client = client;
