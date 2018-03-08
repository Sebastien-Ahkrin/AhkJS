require('dotenv').load()

const config = {
    DISCORD: process.env.DISCORD_TOKEN,
    TWITCH: process.env.TWITCH_TOKEN,
    SERVERS: [
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
    BOT: {
        prefix: "$",
        name: "Ahk",
        game: "help"
    }
}

const Bot = new (require("./Bot.js"))(config);

console.log(Bot);
