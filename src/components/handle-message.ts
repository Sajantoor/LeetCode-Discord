import { Message } from "discord.js";
import { DISCORD_CODE_FORMATTER, PREFIX } from "../utilities/constants";
import handleLeetcode from "./handle-leetcode";
import { message } from "./message";

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
async function proccessMessage(msg: Message): Promise<string> {
    const msgContent = getMessageContent(msg);
    const command = msgContent.split(" ")[0]

    switch (command) {
        case "ping":
            return message("pong");
        case "help":
            return helpMessage();
        case "leetcode":
            return await handleLeetcode(msg);
        default:
            return message(`Unknown command, please use ${PREFIX} help for a list of commands.`);
    }
}

function helpMessage(): string {
    const content = `Commands:
    ${PREFIX}ping - Ping command
    ${PREFIX}help - List of commands
    ${PREFIX}leetcode: 
        ${PREFIX}leetcode [question number] - Get question information 
        ${PREFIX}leetcode submit [question number] [language] [code] - Submit code for a question
    `;

    return message(content);
}

export function getMessageContent(message: Message): string {
    return message.content.substring(PREFIX.length);
}

export function getArgsFromMessage(message: Message): string[] {
    const msg = getMessageContent(message);
    const args = msg.split(DISCORD_CODE_FORMATTER)[0].split(" ");
    // trim each argument
    for (let i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
    }

    return args;
}

export function getUserIdFromArg(arg: string): string {
    return arg.split("<@")[1].split(">")[0];
}

export function getCodeFromMesage(message: Message): string {
    const msg = getMessageContent(message);
    return msg.split(DISCORD_CODE_FORMATTER)[1];
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
    const output = await proccessMessage(message);
    message.reply(output);
}

export default handleMessage;
