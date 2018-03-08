const fs = require("fs");
const Discord = require('discord.js')
const client = new Discord.Client()

const event = require("./events/events.js")

const commands = require("./commands.js")

class Bot {

    constructor(config){
        this._token = config.DISCORD
        this._twitch = config.TWITCH
        this._servers = config.SERVERS
        this._bot = config.BOT

        this.init();
    }

    init() {
        client.on('ready',
            () => {
                client.user.setAvatar(fs.readFileSync('./ressources/Ahk.png'), err => {
                    if (err) throw err
                })

                client.user.username = this._bot.name

                client.user.setPresence(
                    {
                        game: {
                            name: this._bot.prefix + this._bot.game
                        }
                    }
                )

                console.log(`Logged in as ${client.user.tag}\n` +
                            `TOKEN = "${client.token}"\n`)
            }
        )

        client.on('message', message => commands.on(message))

        client.on("guildMemberAdd", (member) => {
            event.onJoinGuild(this._servers, member)
        });

        client.on('reconnecting', () => console.log('Reconnecting'))
        client.on('error', error => console.error(error))

        client.login(this._token)
    }

}

module.exports = Bot
