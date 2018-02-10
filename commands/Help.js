const Commands = require("./Commands.js");
const Discord = require('discord.js');

module.exports = class help extends Commands{

    constructor(name, description, syntax, prefix){
        super(name, description, syntax, prefix);
    }

    action(message){
        const embed = new Discord.RichEmbed();
        embed.setColor("#016AC7");
        embed.setDescription("__**List of commands :**__");
        embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");

        this.commands.forEach(
            cmd => {
                embed.addField(cmd.prefix + "**" + cmd.syntax + "**", "*> " + cmd.description + "*");
            }
        );

        message.channel.send({embed});
    }

    error(){

    }

    help(){

    }

}
