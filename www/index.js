const WebSocket = require('ws');

class Server {

    constructor(port, client){

        const wss = new WebSocket.Server({ port: port });

        wss.on('connection', (ws) => {
          ws.on('message', (message) => {
            console.log('received: %s', message)
          })

          //Send des guilds de base
          ws.send(JSON.stringify({ type: "guild", data: client.guilds.array() }))
      })

    }

}

module.exports = Server
