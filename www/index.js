const WebSocket = require('ws');

class Server {

    constructor(port, client){

        this._wss = new WebSocket.Server({ port: port });

        this._wss.on('connection', (ws) => {
          ws.on('message', (message) => {
            console.log('received: %s', message)
          })

          //Send des guilds de base
          ws.send(JSON.stringify({ type: "guild", data: client.guilds.array() }))
      })

    }

    sendMessage(message){
        this._wss.clients.forEach(ws => {
            ws.send(JSON.stringify(
                {
                    type: "message",
                    data: {
                        author: {
                            id: message.author.id,
                            name: message.author.username,
                            url: message.author.avatarURL
                        },
                        guild: {
                            id: message.guild.id,
                            name: message.guild.name
                        },
                        message: {
                            id: message.id,
                            channel: message.channel.name,
                            content: message.content,
                            date: message.createdAt
                        }
                    }
                }
            ))
        })
    }

}

module.exports = Server
