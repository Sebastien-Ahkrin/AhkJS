const Commands = require("./Commands.js");
const Discord = require('discord.js');

const rp = require("request-promise");

if (process.env.TWITCH_TOKEN === undefined) {
  require('dotenv').load();
}

module.exports = class Twitch extends Commands {

    constructor(prefix){
        super("twitch", "Get a twitch informations", prefix, 'twitch <name:string>');
    }

    action(message, args){
        if(args.length !== 1) { this.error(message); return; }

        const stream = args[0];

        const options = {
            uri: 'https://api.twitch.tv/kraken/streams/' + stream,
            qs: {
                client_id: process.env.TWITCH_TOKEN
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        rp(options)
            .then(result => {
                const streaming = (result.stream === null ? false : true);

                const embed = new Discord.RichEmbed();
                embed.setColor("#016AC7");
                embed.setDescription("**Informations :** " + stream);
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png");
                embed.addField("Lien : ", (streaming) ? result.stream.channel.url : "Information non trouvé.");
                embed.addField("En ligne : ", (streaming ? "Oui" : "Non"));

                message.channel.send({embed});
            }).catch(err => this.error(message, err));
    }

    error(message, error){

        if(error === undefined){
            const embed = new Discord.RichEmbed();
            embed.setColor("#EFEA6B");
            embed.setThumbnail("http://litarvan.github.io/krobot_icons/warn.png");
            embed.addField("**Error**", "Vous devez donner uniquement, 1 arguments.");

            message.channel.send({embed});
        }else{
            console.log(error);
        }

    }

    help(){

    }

}
