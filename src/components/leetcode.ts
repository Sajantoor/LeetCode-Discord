import { CODE_SPLITTER } from "../utilities/constants";
import { fileExtension, submissionArgs } from "../utilities/lc-types";
import { getQuestion, submit, test } from "./leetcode-api";

// Check if it's a valid leetcode command, if it is call the proper APIs and 
// return the output
async function handleLeetcode(msg: string): Promise<string> {
    const args = msg.split(CODE_SPLITTER)[0].split(" ");
    // trim each argument
    for (let i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
    }

    const command = args[1];
    const submissionArgs = args[2] as submissionArgs;
    const language = args[3] as fileExtension;
    const code = msg.split(CODE_SPLITTER)[1];

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
