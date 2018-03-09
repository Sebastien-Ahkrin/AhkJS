const Commands = require("./Commands.js");
const Discord = require('discord.js');

class GitHub extends Commands {

    constructor(){
        super(
            "github",
            "Show My GitHub Account.",
            "github",
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            }
        );
    }

    setPrefix(prefix){
        super.setPrefix(prefix)
    }

    action(message, args){
        super.action(message, args).then(
            channel => {
                const embed = new Discord.RichEmbed();
                embed.setColor("#016AC7");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
                embed.addField("**GitHub**", "https://github.com/Sebastien-Ahkrin/AhkJS");
                channel.send({ embed });
            }
        ).catch(
            type => {
                super.error(message, type);
            }
        );
    }

}

module.exports = new GitHub()
