const fs = require("fs")

const Discord = require('discord.js')
const client = new Discord.Client()

class Bot {

    constructor(config){
        this._token = config.discord
        this._twitch = config.twitch
        this._servers = config.servers
        this._bot = config.bot
        this.commands = config.commands
        this._presence = { game: { name: this._bot.prefix + this._bot.game }}
        this.init();
    }

    init() {
        this.listener = new (require("./commands/utils/CommandsListener.js"))(this._bot.prefix, client)
        this.initCommands()

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
        this.commands.forEach(cmd => this.listener.addCommands(cmd))
    }

}

module.exports = Bot
