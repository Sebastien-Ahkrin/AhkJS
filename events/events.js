const Discord = require('discord.js')
const client = new Discord.Client()

function onJoinGuild(servers, member){
    const guild = member.guild

    servers.forEach(server => {
        if(guild.id === server.id){

            const embed = new Discord.RichEmbed()
            embed.setAuthor(member.user.username, member.user.avatarURL)
            embed.setColor(server.message.color)

            server.message.fields.forEach(e => {
                embed.addField(e.title.replace("%name%", member.user.username), e.content)
            })

            guild.channels.forEach(
                channel => {
                    if(channel.id === process.env.GALHARIM_CHAN_ID){
                        channel.send({ embed })
                    }
                }
            )

        }
    })

}

module.exports = {
    onJoinGuild
}
