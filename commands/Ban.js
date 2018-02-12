const Commands = require("./Commands.js");

module.exports = class Ban extends Commands {

    constructor(prefix){
        super(
            "ban",
            "Ban a user [Only for Admin]",
            prefix,
            'ban',
            {
                user: ["BAN_MEMBERS"],
                client: ['BAN_MEMBERS']
            },
            [ "<id:int>", "<msg:string>" ]
        );
    }

    action(message, args){
        super.action(message, args).then(
            channel => {
                const target = args[0];
                const reason = args[1];
                const guild = channel.guild;

                let find = false;

                guild.members.forEach(
                    member => {
                        if(member.id === target){
                            find = true;
                            if(member.bannable === true){
                                member.ban(reason);
                            }else{
                                this.error("BAN", channel);
                            }
                        }
                    }
                );

                if(find === false){
                    this.error("FIND", channel);
                }

            }
        ).catch(
            type => {
                super.error(message, type);
            }
        )
    }

    error(type, channel){
        switch(type){
            case "FIND":
                const find = new Discord.RichEmbed();
                embed.setColor("#EFEA6B");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/warn.png");
                embed.addField("**Error**", "Je ne trouve personne.");
                channel.send({ find });
                break;
            case "BAN":
                const ban = new Discord.RichEmbed();
                embed.setColor("#EFEA6B");
                embed.setThumbnail("http://litarvan.github.io/krobot_icons/error.png");
                embed.addField("**Error**", "Je ne peux pas bannir la personne.");
                channel.send({ ban });
                break;
            default:
                break;
        }
    }

}