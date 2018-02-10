const Commands = require("./Commands.js");
const Discord = require('discord.js');

module.exports = class Ping extends Commands {

    constructor(prefix){
        super("ping", "Pong", prefix, 'ping');
    }

    action(message, args){
        const embed = new Discord.RichEmbed();
        embed.setColor("#016AC7");
        embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
        embed.addField("**" + "ping" + "**", "pong");
        message.channel.send({embed});
    }

    error(){

    }

    help(){

    }

}
