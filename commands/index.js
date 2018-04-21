const clr = {
    name: 'clear',
    description: 'Clear a channel',
    examples: ['clear ["number"]'],
    aliases: ['clr'],
    permissions: {
        user: ['MANAGE_MESSAGES'],
        client: ['MANAGE_MESSAGES']
    }
}

const add = {
    name: 'add',
    description: 'Send a message for add Ahk in your guilde.',
    examples: ['add'],
    aliases: ['add'],
    permissions: {
        user: ['SEND_MESSAGES'],
        client: ['SEND_MESSAGES']
    }
}

const ban = {
    name: 'ban',
    description: 'Ban a user [Only for Admin]',
    examples: ['ban @Ahkrin#0001'],
    aliases: ['ban'],
    permissions: {
        user: ['BAN_MEMBERS'],
        client: ['BAN_MEMBERS']
    }
}

const github = {
    name: 'github',
    description: 'Show My GitHub Account.',
    examples: ['github'],
    aliases: ['git'],
    permissions: {
        user: ['SEND_MESSAGES'],
        client: ['SEND_MESSAGES']
    }
}

const ping = {
    name: 'ping',
    description: 'pong',
    examples: ['ping'],
    aliases: ['ping'],
    permissions: {
        user: ['SEND_MESSAGES'],
        client: ['SEND_MESSAGES']
    }
}

module.exports = {
    clr,
    add,
    ban,
    github,
    ping
}
