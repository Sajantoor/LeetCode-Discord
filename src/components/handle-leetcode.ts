import { Message } from "discord.js";
import { getArgsFromMessage } from "../utilities/helpers";
import { getQuestion, submit } from "./leetcode-api";
import { errorMessage } from "./message";
import { getUserScoreCommand, getUserSubmittedQuestionsCommand } from "./user-api";

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
        case "score":
            return await getUserScoreCommand(message);
        case "submitted":
            return await getUserSubmittedQuestionsCommand(message);
        default:
            return errorMessage("Unknown leetcode command");
    }
}

export default handleLeetcode;
