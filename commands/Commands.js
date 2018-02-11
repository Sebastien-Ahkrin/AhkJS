const client = require("./../index.js");

module.exports = class Commands {

    constructor(name, description, prefix, usage, permissions){
        this.name = name;
        this.description = description;
        this.prefix = prefix;
        this.usage = usage;
        this.permissions = permissions;
    }

    action(message, args){
        const member = message.member;

        console.log(cmd.permissions);

        this.permissions.user.forEach(
            perm => {
                if(!member.hasPermission(perm)) return;
            }
        );

    }

    error(message, type){

    }

    help(){}

}
