const Commands = require("./Commands.js");
const Discord = require('discord.js');

const client = require('./../main.js');

module.exports = class Clr extends Commands {

    constructor(prefix){
        super(
            "clr",
            "Clear a number of message [Only for Admin]",
            prefix,
            '<num:int>',
            {
                user: ['MANAGE_MESSAGES'],
                client: ['MANAGE_MESSAGES']
            }
        );
    }

    action(message, args){
        if(args.length !== 1) { this.error(message); return; }
        const number = args[0];
        if(number <= 0 || number > 100) { this.error(message); return; }

        const member = message.member;

        if(!member.hasPermission("MANAGE_MESSAGES")){ this.error(message, "permission"); return; }

        const d = (number < 100 ? (parseInt(number) + 1) : number)

        message.channel.fetchMessages({ limit: d })
               .then(list => {
                    message.channel.bulkDelete(list);
                }, err => this.error(message, err));

    }

    error(message, error){

        if(error === undefined){
            const embed = new Discord.RichEmbed();
            embed.setColor("#EFEA6B");
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/warn.png");
            embed.addField("**Error**", "Vous devez donner uniquement, 1 arguments. Entre, 1 et 100.");

            message.channel.send({embed});
        }else{
            if(error === "permission"){
                const embed = new Discord.RichEmbed();
                embed.setColor("#b8001e");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/error.png");
                embed.addField("**Error**", "Vous n'avez pas la permission de faire ceci.");
            }else{
                const embed = new Discord.RichEmbed();
                embed.setColor("#b8001e");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/error.png");
                embed.addField("**Error**", "Il y a eu un probleme avec la commande.");
                embed.addField("**Permission**", "J'ai besoin de la permission MESSAGE_MANAGE.");
            }
        }

    }

    help(){

    }

}
