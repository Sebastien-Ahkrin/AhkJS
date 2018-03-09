const Commands = require("./Commands.js");
const Discord = require('discord.js');


class Clr extends Commands {

    constructor(){
        super(
            "clr",
            "Clear a number of message [Only for Admin]",
            'clr',
            {
                user: ['MANAGE_MESSAGES'],
                client: ['MANAGE_MESSAGES']
            },
            [ "<num:int>" ]
        )
    }

    async action(message, args){

        try{
            const channel = await super.action(message, args)
            const number = args[0]
            if(number <= 0 || number > 100) {
                this.error(message)
                return
            }

            const d = (number < 100 ? (parseInt(number) + 1) : number)

            message.channel.fetchMessages({ limit: d }).then(
                list => {
                    message.channel.bulkDelete(list)
                }
            ).catch(
                error => {
                    this.error(message, err)
                }
            )
        }catch(type){
            super.error(message, type)
        }

    }

    error(message){
        const embed = new Discord.RichEmbed()
        embed.setColor("#EFEA6B")
        embed.setThumbnail("http://litarvan.github.io/krobot_icons/warn.png")
        embed.addField("**Error**", "L'argument doit être compris entre 1 et 100.")
        message.channel.send({embed})
    }

}

module.exports = new Clr()
