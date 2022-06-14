import { Message } from "discord.js";
import { PREFIX } from "../utilities/constants";
import handleLeetcode from "./leetcode";

/**
 * Checks if a message is valid and should be handled.
 * @param message The discord message to check
 * @returns True if the message is valid, false otherwise
 */
function validateMessage(message: Message): boolean {
    // check if the message is from a bot
    if (message.author.bot) return false;

    // check if the message does not start with prefix
    if (!message.content.startsWith(PREFIX)) return false;

    return true;
}

/**
 * Checks if the message is a valid command and handles it
 * @param msg The message to handle
 * @returns An output string to be sent to the channel
 */
async function proccessMessage(msg: string): Promise<string> {
    const command = msg.split(" ")[0]

    switch (command) {
        case "ping":
            return "pong";
        case "help":
            return "This is a help message";
        case "leetcode":
            return await handleLeetcode(msg);
        default:
            return "Unknown command";
    }
}

/**
 * Processes, validates and handles a message
 * @param message The message to process, validates and handle
 * @returns void promise, outputs nothing or replies to the message
 */
async function handleMessage(message: Message) {
    // validate message
    if (!validateMessage(message)) return;

    // message is guaranteed to be valid and has a prefix, remove prefix
    const msg = message.content.substring(PREFIX.length);
    const output = await proccessMessage(msg);
    message.reply(output);
}

export default handleMessage;
