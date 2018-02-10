const commands = require('./main.js');

const discord = require('discord.js');
const client = new discord.Client();

client.on('message', message => commands.main(message));
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.on('reconnecting', () => console.log('Reconnecting'));
client.on('error', error => console.error(error));

if (process.env.DISCORD_TOKEN === undefined) {
  require('dotenv').load();
}

client.login(process.env.DISCORD_TOKEN);
