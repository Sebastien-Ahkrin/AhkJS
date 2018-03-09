const Commands = require("./Commands.js");
const Discord = require('discord.js');

class Add extends Commands {

    constructor(){
        super(
            "add",
            "Send a message for add Ahk in your guilde.",
            "add",
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            }
        )
    }

    async action(message, args){
        try {
            const channel = await super.action(message, args)
            const embed = new Discord.RichEmbed()
            embed.setColor("#016AC7")
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png")
            embed.addField("**Message for add AhkJS**", "https://discordapp.com/oauth2/authorize?client_id=" + message.client.user.id + "&scope=bot")
            channel.send({embed})
        } catch(type) {
            super.error(message, type)
        }
    }

}

module.exports = new Add()
