class CommandsListener {

    constructor(prefix, client){
        this._prefix = prefix
        this._client = client
        this._commands = []

        client.on('message', message => this.onMessage(message))
    }

    addCommands(commands){
        commands.setPrefix(this._prefix)
        this._commands.push(commands)
        if(commands.name === "help") commands.setCommands(this._commands)
    }

    onMessage(message){
        const channel = message.channel
        const content = message.content

        if(!content.startsWith(this._prefix)) return

        const command = content.split(" ")[0].substring(this._prefix.length)
        const args = message.content.split(' ').slice(1)

        this._commands.forEach(/* A re travailler */
            cmd => {
                if(command.toLowerCase() === cmd.name.toLowerCase()){
                    cmd.action(message, args)
                }
            }
        )
    }

}

module.exports = CommandsListener
