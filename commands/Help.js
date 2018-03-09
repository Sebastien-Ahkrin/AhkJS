const Commands = require("./Commands.js");
const Discord = require('discord.js');

class Help extends Commands {

    constructor(){
        super(
            "help",
            "Displays the list of commands with their descriptions",
            "help",
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            }
        )
    }

    setPrefix(prefix){
        this._prefix = prefix;
    }

    setCommands(commands){
        this._commands = commands
    }

    async action(message, args){

        try {
            const channel = await super.action(message, args)
            const embed = new Discord.RichEmbed()
            embed.setColor("#016AC7")
            embed.setDescription("__**List of commands :**__")
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png")

            this._commands.forEach(
                cmd => {
                    embed.addField(this._prefix + "**" + cmd.usage + "** " +
                        (cmd.args !== undefined ? cmd.args : ""), "*> " +
                            cmd.description + "*")
                }
            )

            channel.send({embed})
        }catch(type){
            super.error(message, type)
        }

    }

}

module.exports = new Help()
