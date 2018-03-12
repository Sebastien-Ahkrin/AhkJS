const fs = require("fs")

const Discord = require('discord.js')
const client = new Discord.Client()

const Listener = require("./commands/utils/CommandsListener.js")

const Server = require("./www/")

class Bot {

    constructor(config){

        this._ws = new Server(8081, client)

        this._token = config.discord
        this._twitch = config.twitch
        this._servers = config.servers
        this._bot = config.bot
        this.commands = config.commands
        this._presence = { game: { name: this._bot.prefix + this._bot.game }}
        this.init();
    }

    init() {
        this.listener = new Listener(this._bot.prefix, client)

        this.initCommands()
        this.initEvents()

        client.on('ready',
            () => {
                client.user.setAvatar(fs.readFileSync(this._bot.icon_path), err => {
                    if (err) throw err;
                });

                client.user.username = this._bot.name
                client.user.setPresence(this._presence)

                console.log(`Logged in as ${client.user.tag}\nTOKEN = "${client.token}"\n`)
            }
        )

        client.on('error', error => console.error(error))

        client.login(this._token)
    }

    initCommands(){
        this.commands.forEach(cmd => this.listener.addCommand(cmd))
    }

    initEvents(){
        client.on("guildMemberAdd", (member) => {

            this._servers.filter(server => member.guild.id === server.id)
                .forEach(serv => {
                    const embed = new Discord.RichEmbed()
                    embed.setAuthor(member.user.username, member.user.avatarURL)
                    embed.setColor(serv.message.color)
                    serv.message.fields.forEach(
                        field => {
                            embed.addField(field.title.replace("%name%", member.user.username), field.content)
                        }
                    )

                    member.guild.channels.filter(channel => channel.id === serv.channel)
                        .forEach(chann => chann.send({ embed }))

                })

        });
    }

}

module.exports = Bot
