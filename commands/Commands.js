const Discord = require('discord.js');

class Commands {

    constructor(name, description, prefix, usage, permissions){
        this.name = name;
        this.description = description;
        this.prefix = prefix;
        this.usage = usage;
        this.permissions = permissions;
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

    action(message, args){
        return new Promise((resolve, reject) => {
            const member = message.member;
            this.permissions.user.forEach(
                perm => {
                    if(!member.hasPermission(perm)){
                        reject("PERMISSION");
                    }
                }
            );
            const client = message.client;
            message.guild.fetchMember(client.user, true)
              .then(
                  member => {
                      this.permissions.client.forEach(
                          perm => {
                              if(!member.hasPermission(perm)){
                                  reject("PERMISSION");
                              }
                              resolve(message.channel);
                          }
                      );
                  }
              );
        });
    }

    error(message, type){
        switch(type){
            case 'PERMISSION':
                const e = this.embed(
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
                message.channel.send(e);
                break;
            default:
                break;
        }
    }

    help(){

    }

}

module.exports = Commands;
