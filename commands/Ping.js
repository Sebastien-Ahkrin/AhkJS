const Commands = require("./Commands.js");
const Discord = require('discord.js');

class Ping extends Commands {

    constructor(){
        super(
            "ping",
            "Pong",
            'ping',
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            }
        )
    }

    async action(message, args){

        try {
            const channel = await super.action(message, args)
            const embed = new Discord.RichEmbed();
            embed.setColor("#016AC7");
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
            embed.addField("**" + "ping" + "**", message.client.ping.toFixed(0) + "ms.");
            channel.send({embed});
        }catch(type){
            super.error(message, type);
        }

    }

}

module.exports = new Ping()
