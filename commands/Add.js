const Commands = require("./Commands.js");
const Discord = require('discord.js');

module.exports = class Ping extends Commands {

    constructor(prefix){
        super(
            "add",
            "Send a message for add Ahk in your guilde.",
            prefix,
            "add",
            {
                user: ["MESSAGE_WRITE"],
                client: ['MESSAGE_WRITE'] 
            }
        );
    }

    action(message, args){
        const embed = new Discord.RichEmbed();
        embed.setColor("#016AC7");
        embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
        embed.addField("**Message for add AhkJS**", "https://discordapp.com/oauth2/authorize?client_id=411883445980233729&scope=bot");
        message.channel.send({embed});
    }

    error(){

    }

    help(){

    }

}
