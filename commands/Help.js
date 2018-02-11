const Commands = require("./Commands.js");
const Discord = require('discord.js');

module.exports = class help extends Commands {

    constructor(prefix){
        super(
            "help",
            "Displays the list of commands with their descriptions",
            prefix,
            "help",
            {
                user: ["SEND_MESSAGES"],
                client: ['ADMINISTRATOR']
            }
        );

    }

    action(message, args){
        /*super.action(message, args, () => {
            const embed = new Discord.RichEmbed();
            embed.setColor("#016AC7");
            embed.setDescription("__**List of commands :**__");
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");

            this.commands.forEach(
                cmd => {
                    embed.addField(cmd.prefix + "**" + cmd.usage + "**", "*> " + cmd.description + "*");
                }
            );

            message.channel.send({embed});
        });*/

        super.action(message, args).then(
            channel => {
                const embed = new Discord.RichEmbed();
                embed.setColor("#016AC7");
                embed.setDescription("__**List of commands :**__");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");

                this.commands.forEach(
                    cmd => {
                        embed.addField(cmd.prefix + "**" + cmd.usage + "**", "*> " + cmd.description + "*");
                    }
                );
                channel.send({embed});
            }
        ).catch(
            type => {
                super.error(message, type);
            }
        )

    }

    error(){}
    help(){}

}
