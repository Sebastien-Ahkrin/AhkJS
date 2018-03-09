const Discord = require('discord.js');

class Commands {

    constructor(name, description, usage, permissions, args){
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.permissions = permissions;
        this.args = args;
    }

    setPrefix(prefix){
        this.prefix = prefix;
    }

    embed(color, title, photo, fields){
        const embed = new Discord.RichEmbed();
        embed.setColor(color);
        embed.setDescription(title);
        embed.setThumbnail(photo);
        fields.forEach(
            field => {
                embed.addField(field.title, field.content);
            }
        );
        return embed;
    }

    action(message, args) {
        const member = message.member;
        this.permissions.user.forEach(
            perm => {
                if (!member.hasPermission(perm)) return Promise.reject("PERMISSION");
            }
        );
        const client = message.client;
        return message.guild.fetchMember(client.user, true)
            .then(member => {
                this.permissions.client.forEach(
                    perm => {
                        if (!member.hasPermission(perm)) throw "PERMISSION";
                    }
                );
                if(this.args !== undefined){
                    if(args.length !== this.args.length) throw "ARGUMENT";
                }
                return message.channel;
            }
        );
    }

    error(message, type){
        switch(type){
            case 'PERMISSION':
                const permission = this.embed(
                    "#b8001e",
                    "",
                    "http://litarvan.github.io/krobot_icons/error.png",
                    [
                        {
                            title: "**Error**",
                            content: "Il manque des permissions."
                        },
                        {
                            title: "**Client**",
                            content: "Le client a besoin de la permission : "
                                    + this.permissions.client
                        },
                        {
                            title: "**User**",
                            content: "L'utilisateur a besoin de la permission : "
                                    + this.permissions.user
                        }
                    ]
                );
                message.channel.send(permission);
                break;
            case "ARGUMENT":
                const argument = this.embed(
                    "#EFEA6B",
                    "",
                    "http://litarvan.github.io/krobot_icons/warn.png",
                    [
                        {
                            title: "**Error**",
                            content: "Probleme avec les arguments."
                        },
                        {
                            title: "**Aide**",
                            content: "Tapez  **" + this.prefix + "help** "
                                    + "pour plus d'aide."
                        },
                        {
                            title: "**Arguments**",
                            content: "Vous avez besoin de " +
                                this.args.length + " arguments."
                        }
                    ]
                );
                message.channel.send(argument);
                break;
            default:
                break;
        }
    }

}

module.exports = Commands;
