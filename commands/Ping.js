const Commands = require("./Commands.js");
const Discord = require('discord.js');

module.exports = class Ping extends Commands {

    constructor(prefix){
        super(
            "ping",
            "Pong",
            prefix,
            'ping',
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            }
        );
    }

    action(message, args){
        super.action(message, args).then(
            channel => {
                const embed = new Discord.RichEmbed();
                embed.setColor("#016AC7");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
                embed.addField("**" + "ping" + "**", message.client.ping.toFixed(3) + "ms.");
                channel.send({embed});
            }
        ).catch(
            type => {
                super.error(message, type);
            }
        )
    }

}
