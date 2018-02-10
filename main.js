const prefix = "<";

const Help = require("./commands/Help.js");
const Ping = require("./commands/Ping.js");

const pingCommands = new Ping(
    "ping",
    "Pong",
    "ping",
    prefix
);

const helpCommands = new Help(
    "help",
    "Displays the list of commands with their descriptions",
    "help",
    prefix
);

const commands = [
    helpCommands,
    pingCommands
];

helpCommands.commands = commands;

function main(message){
    const channel = message.channel;
    const content = message.content;

    if(content.indexOf(prefix) !== 0) return;

    const command = content.split(" ")[0].substring(1);
    const args = message.content.split(' ').slice(1);

    commands.forEach(
        cmd => {
            if(command === cmd.name){
                cmd.action(message);
            }
        }
    );

}

module.exports = {
    main
}
