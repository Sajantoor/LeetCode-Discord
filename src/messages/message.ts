import { Message } from "discord.js";
import { PREFIX } from "../utilities/constants";

/**
 * Checks if a message is valid and should be processed.
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
 *
 * @param msg The message to handles
 * @returns An output string to be sent to the channel
 */
async function handleMessage(msg: string): Promise<string> {
    return msg;
}

/**
 * Processes, validates and handles a message
 * @param message The message to process
 * @returns Void
 */
async function processMessage(message: Message) {
    // validate message
    if (!validateMessage(message)) {
        return;
    }
    // message is guaranteed to be valid and has a prefix, remove prefix
    const msg = message.content.toLowerCase().substring(PREFIX.length);
    const output = await handleMessage(msg);
    message.channel.send(output);
}

export default processMessage;
