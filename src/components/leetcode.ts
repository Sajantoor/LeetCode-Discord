
// Check if it's a valid leetcode command, if it is call the proper APIs and 

import { submissionArgs } from "src/utils/lc-types";
import { getQuestion, submit, test } from "./leetcode-api";

// return the output
async function handleLeetcode(msg: string): Promise<string> {
    const args = msg.split(" ");
    console.log(args);
    const command = args[1];
    const submissionArgs = args[2] as submissionArgs;
    const code = args[3];

    if (submissionArgs == null) {
        return "Invalid arguments";
    }

    console.log(command);

    switch (command) {
        case "question":
            return await getQuestion(submissionArgs);
        case "submit":
            return await submit(submissionArgs, code);
        case "test":
            return await test(submissionArgs, code);
        default:
            return "Unknown leetcode command";
    }
}

export default handleLeetcode;
