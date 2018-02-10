const prefix = "<";

const Help = new (require("./commands/Help.js"))(prefix);
const Ping = new (require("./commands/Ping.js"))(prefix);
const Add = new (require("./commands/Add.js"))(prefix);
const GitHub = new (require("./commands/GitHub.js"))(prefix);

const commands = [
    Help,
    Ping,
    Add,
    GitHub
];

Help.commands = commands;

function main(message){
    const channel = message.channel;
    const content = message.content;

    if(!content.startsWith(prefix)) return;

    const command = content.split(" ")[0].substring(prefix.length);
    const args = message.content.split(' ').slice(1);

    commands.forEach(
        cmd => {
            if(command.toLowerCase() === cmd.name.toLowerCase()){
                cmd.action(message);
            }
        }
    );

}

module.exports = {
    main
}
