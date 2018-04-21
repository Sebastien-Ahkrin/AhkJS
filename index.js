require('dotenv').load()

const Discord = require('discord.js')
const commands = require('./commands')
const Bot = require('ahkframework')

const prefix = '/'

const config = {
    token: process.env.DISCORD_TOKEN,
    name: "Ahk",
    prefix: prefix,
    version: "1.0.0",
    icon_path: "./ressource/Ahk.png",
    presence: { name: prefix + "help" }
}

const user = new Bot(config)

user.registerEvent('guildMemberAdd', (member) => {
    if(member.guild.id === process.env.GALHARIM_ID){
        const embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.avatarURL)
            .setColor('#EFEA6B')
            .addField('Bienvenue à ' + member.user.username, 'Souhaitez la bienvenue au nouveau vous autres, ou soyez maudit !')

        member.guild.channels.filter(channel => channel.id === process.env.GALHARIM_CHAN_ID)
            .forEach(chann => chann.send({ embed }))

    }
})

user.registerCommand(commands.github, (message, channel, client, args) => {
    const embed = new Discord.RichEmbed()
        .setColor("#016AC7")
        .setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png")
        .addField("**GitHub**", "https://github.com/Sebastien-Ahkrin/AhkJS")
    channel.send({ embed })
})


user.registerCommand(commands.clr, (message, channel, client, args) => {
    const number = args[0]
    if(number <= 0 || number > 100) {
        const embed = new Discord.RichEmbed()
            .setColor("#EFEA6B")
            .setThumbnail("http://litarvan.github.io/krobot_icons/warn.png")
            .addField("**Error**", "L'argument doit être compris entre 1 et 100.")
        channel.send({ embed })
    }

    const d = (number < 100 ? (parseInt(number) + 1) : number)
    message.channel.fetchMessages({ limit: d }).then(list => {
        message.channel.bulkDelete(list)
    }).catch(error => {
        const embed = new Discord.RichEmbed()
            .setColor("#EFEA6B")
            .setThumbnail("http://litarvan.github.io/krobot_icons/warn.png")
            .addField("**Error**", "Une erreur est survenue.")
        channel.send({ embed })
    })

})

user.registerCommand(commands.add, (message, channel, client, args) => {
    const embed = new Discord.RichEmbed()
        .setColor('#016AC7')
        .setThumbnail("http://litarvan.github.io/krobot_icons/info_v2.png")
        .addField("**Message for add AhkJS**", "https://discordapp.com/oauth2/authorize?client_id=" + message.client.user.id + "&scope=bot")
    channel.send({ embed })
})

user.registerCommand(commands.ban, (message, channel, client, args) => {
    const guild = channel.guild

    let find = false

    guild.members.forEach(member => {
        if(member.id === target){
            find = true
            if(member.bannable === true){
                if(target === "182414082022834176" || target === "327082190460682240"){
                    const ban = new Discord.RichEmbed()
                        .setColor("#EFEA6B")
                        .setThumbnail("http://litarvan.github.io/krobot_icons/error.png")
                        .addField("**Error**", "Je ne peux pas bannir la personne.")
                    channel.send({ ban })
                }else{
                    member.ban(reason)
                }
            }else{
                this.error("BAN", channel)
            }
        }
    })

    if(find === false){
        const embed = new Discord.RichEmbed()
            .setColor("#EFEA6B")
            .setThumbnail("http://litarvan.github.io/krobot_icons/warn.png")
            .addField("**Error**", "Je ne trouve personne.")
        channel.send({ embed })
    }

})

user.createDefaultCommand()
