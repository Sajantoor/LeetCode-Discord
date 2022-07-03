import { Message } from "discord.js";
import { DISCORD_CODE_FORMATTER, PREFIX } from "./constants";

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