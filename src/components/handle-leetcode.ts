import { Message } from "discord.js";
import { getArgsFromMessage } from "./handle-message";
import { getQuestion, submit, test } from "./leetcode-api";
import { errorMessage } from "./message";

/**
 * Checks if it's a valid leetcode command, if it is then call the proper APIs and
 * return the output
 * 
 * @param message The message from the user
 * @returns The output of the command
 */
async function handleLeetcode(message: Message): Promise<string> {
    const args = getArgsFromMessage(message);
    const command = args[1];

    switch (command) {
        case "question":
            return await getQuestion(message);
        case "submit":
            return await submit(message);
        case "test":
            return await test(message);
        default:
            return errorMessage("Unknown leetcode command");
    }
}

export default handleLeetcode;
