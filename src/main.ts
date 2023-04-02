import "dotenv/config";
// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import Ping from "./plugins.ts/ping";
import Here from "./plugins.ts/here";
import Grade from "./plugins.ts/grade";
import ModalCallback from "./plugins.ts/modalCallback";

const regsiteredCommands = [Ping, Here, Grade, ModalCallback];
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    await Promise.all(regsiteredCommands.map(f => f(interaction)));
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);