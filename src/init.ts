import { REST, Routes } from "discord.js";
import "dotenv/config";

const rest = new REST({version: "10"}).setToken(process.env.TOKEN || "");

async function registerCommands() {
    try {
        await rest.put(Routes.applicationCommands("1092061486786027541"), {
            body: [{
                name: "ping",
                description: "ピンを打つ"
            },
            {
                name: "here",
                description: "年確召喚"
            }]
        });
    } catch(error) {
        console.error(error);
    }
}

registerCommands();