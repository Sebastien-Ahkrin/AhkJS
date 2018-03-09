require('dotenv').load()

const config = {
    discord: process.env.DISCORD_TOKEN,
    twitch: process.env.TWITCH_TOKEN,
    servers: [
        {
            id: process.env.GALHARIM_ID,
            channel: process.env.GALHARIM_CHAN_ID,
            message: {
                color: "#EFEA6B",
                fields: [
                    {
                        title: "Bienvenue à %name%",
                        content: "Souhaitez la bienvenue au nouveau vous autres, ou soyez maudit !"
                    }
                ]
            }
        }
    ],
    bot: {
        prefix: "/",
        name: "Ahk",
        game: "help",
        icon_path: "./ressources/Ahk.png"
    },
    commands: [
        new (require("./commands/Add.js")),
        new (require("./commands/Ban.js")),
        new (require("./commands/Clr.js")),
        new (require("./commands/GitHub.js")),
        new (require("./commands/Ping.js")),
        new (require("./commands/Help.js"))
    ]
}

new (require("./Bot.js"))(config);
