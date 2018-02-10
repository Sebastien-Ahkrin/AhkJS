const prefix = "<";

const Help = new (require("./commands/Help.js"))(prefix);
const Ping = new (require("./commands/Ping.js"))(prefix);

const commands = [
    Help,
    Ping
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
            if(command === cmd.name){
                cmd.action(message);
            }
        }
    );

}

module.exports = {
    main
}
