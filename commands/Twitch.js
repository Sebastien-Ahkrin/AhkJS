const Commands = require("./Commands.js");
const Discord = require('discord.js');

const rp = require("request-promise");

if (process.env.TWITCH_TOKEN === undefined) {
  require('dotenv').load();
}

module.exports = class Twitch extends Commands {

    constructor(prefix){
        super(
            "twitch",
            "Get a twitch informations",
            prefix,
            'twitch',
            {
                user: ["SEND_MESSAGES"],
                client: ['SEND_MESSAGES']
            },
            [ "<name:string>" ]
        );
    }

    action(message, args){
        super.action(message, args).then(
            channel => {
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
                    }).catch(
                        err => {
                            console.error(err);
                        }
                    );
            }
        ).catch(
            type => {
                super.error(message, type);
            }
        );
    }

}
