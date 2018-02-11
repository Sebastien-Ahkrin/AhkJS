const fs = require("fs");

const app = require('./main.js');

const Discord = require('discord.js');
const client = new Discord.Client();

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

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if(guild.id === "278966830473674753"){
        const embed = new Discord.RichEmbed();
        embed.setAuthor(member.user.username, member.user.avatarURL);
        embed.setColor("#EFEA6B");
        embed.addField("Bienvenue à " + member.user.username,
            "Souhaitez la bienvenue au nouveau vous autres, ou soyez maudit !");
        guild.channels.forEach(
            channel => {
                if(channel.id === "278967298310799362"){
                    channel.send({ embed });
                }
            }
        );
    }
});

client.on('reconnecting', () => console.log('Reconnecting'));
client.on('error', error => console.error(error));

if (process.env.DISCORD_TOKEN === undefined) {
  require('dotenv').load();
}

client.login(process.env.DISCORD_TOKEN);

global.client = client;
