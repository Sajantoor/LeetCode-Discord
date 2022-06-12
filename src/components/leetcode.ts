import { DISCORD_CODE_FORMATTER } from "../utilities/constants";
import { fileExtension, submissionArgs } from "../utilities/lc-types";
import { getQuestion, submit, test } from "./leetcode-api";

/**
 * Checks if it's a valid leetcode command, if it is then call the proper APIs and
 * return the output
 * 
 * @param msg The message from the user
 * @returns The output of the command
 */
async function handleLeetcode(msg: string): Promise<string> {
    const args = msg.split(DISCORD_CODE_FORMATTER)[0].split(" ");
    // trim each argument
    for (let i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
    }

    const command = args[1];
    const submissionArgs = args[2] as submissionArgs;
    const language = args[3] as fileExtension;
    const code = msg.split(DISCORD_CODE_FORMATTER)[1];

    switch (command) {
        case "question":
            return await getQuestion(submissionArgs);
        case "submit":
            return await submit(submissionArgs, language, code);
        case "test":
            return await test(submissionArgs, language, code);
        default:
            return "Unknown leetcode command";
    }
}

export default handleLeetcode;
