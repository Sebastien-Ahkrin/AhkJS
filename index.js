const fs = require("fs");

const app = require('./main.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "<";

if (process.env.DISCORD_TOKEN === undefined ||
    process.env.GALHARIM_ID === undefined ||
        process.env.GALHARIM_CHAN_ID === undefined) {
    require('dotenv').load();
}


client.on('message', message => app.main(message));

client.on('ready',
    () => {
        client.user.setAvatar(fs.readFileSync('./ressources/Ahk.png'), err => {
            if (err) throw err;
        });
        client.user.username = "AhkJS";

        client.user.setPresence(
            {
                game: {
                    name: prefix + "help"
                }
            }
        );

        console.log(`Logged in as ${client.user.tag}\n` +
                    `TOKEN = "${client.token}"\n`);
    }
);

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if(guild.id === process.env.GALHARIM_ID){
        const embed = new Discord.RichEmbed();
        embed.setAuthor(member.user.username, member.user.avatarURL);
        embed.setColor("#EFEA6B");
        embed.addField("Bienvenue à " + member.user.username,
            "Souhaitez la bienvenue au nouveau vous autres, ou soyez maudit !");
        guild.channels.forEach(
            channel => {
                if(channel.id === process.env.GALHARIM_CHAN_ID){
                    channel.send({ embed });
                }
            }
        );
    }
});

client.on('reconnecting', () => console.log('Reconnecting'));
client.on('error', error => console.error(error));

client.login(process.env.DISCORD_TOKEN);
