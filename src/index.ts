import { Client, Intents } from "discord.js";
import handleMessage from "./components/handle-message";
import { BOT_TOKEN } from "./utilities/constants";

async function main() {
    // Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    // Login to Discord with your client's token
    client.login(BOT_TOKEN);

    client.once("ready", () => {
        console.log("Ready!");
    });

    // Create an event listener for messages
    client.on("messageCreate", (message) => handleMessage(message));
}

main();
