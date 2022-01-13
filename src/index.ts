import { Client, Intents } from "discord.js";
import processMessage from "./messages/message";
import { BOT_TOKEN } from "./utilities/constants";

async function main() {
    // Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    // When the client is ready, run this code (only once)
    client.once("ready", () => {
        console.log("Ready!");
    });

    // Login to Discord with your client's token
    client.login(BOT_TOKEN);

    // Create an event listener for messages
    client.on("messageCreate", (message) => processMessage(message));
}

main();
