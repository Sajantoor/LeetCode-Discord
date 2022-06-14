import util from "util";
import { exec as _exec } from "child_process";
import fs from "fs";
import { fileExtension, questionArgs, submissionArgs } from "../utilities/lc-types";
import { errorMessage, message } from "./message";
import { Message } from "discord.js";
import { getArgsFromMessage, getCodeFromMesage } from "./handle-message";
const exec = util.promisify(_exec);


/**
 * Helper function to outputs the question content for a given argument
 * @param arg The question argument
 * @returns The output of the command
 */
async function getQuestionContent(arg: questionArgs): Promise<string> {
    const output = await runCommand(`leetcode show ${arg}`);
    return output.stdout;
}

/**
 * @param arg The arguments for the question
 * @returns The leetcode question and information for the given argument
 */
export async function getQuestion(msg: Message) {
    const args = getArgsFromMessage(msg);
    const arg = args[2] as questionArgs;

    if (arg == null) {
        return errorMessage("Invalid leetcode question argument...");
    }

    const output = await getQuestionContent(arg);
    return message(output);
}

/**
 * Submits the given code to leetcode and returns whether it was successful or not
 * 
 * @param arg Submission argument
 * @param language The language of the submitted code
 * @param code The code to submit
 * @returns The output of the submsission
 */
export async function submit(message: Message) {
    const args = getArgsFromMessage(message);
    const arg = args[2] as submissionArgs;
    const language = args[3] as fileExtension;
    const code = getCodeFromMesage(message);

    return await submission(arg, language, code, false);
}

/**
 * Tests the given code and returns the output
 * 
 * @param arg Submission argument
 * @param language The language of the submitted code
 * @param code The code to submit
 * @returns The output of the submsission
 */
export async function test(message: Message) {
    const args = getArgsFromMessage(message);
    const arg = args[2] as submissionArgs;
    const language = args[3] as fileExtension;
    const code = args[4] as string;

    return await submission(arg, language, code, true);
}

/**
 * Helper function to get the filename for a given question number
 * @param questionNumber The leetcode question number
 * @param fileExtension The file extension of the file
 * @returns The filename for a given question number and file extension of form 
 *         "[question number].[question title].[file extension]"
 */
async function getFilename(questionNumber: number, fileExtension: string): Promise<string> {
    const output = await getQuestionContent(questionNumber);
    const title = output.split("\n")[0].split("]")[1].trim();
    return `${questionNumber}.${title}.${fileExtension}`;
}


/**
 * Helper function to validate the submission parameters for submission and tests
 * @param arg The submission argument
 * @param fileExtension The file extension of the file
 * @param code The code to submit
 * @returns True if the parameters are valid, False otherwise
 */
function validateSubmissionParams(arg: submissionArgs, fileExtension: fileExtension, code: string): boolean {
    if (arg == null || fileExtension == null || code == null) {
        return false;
    }
    return true;
}

/**
 * Helper function to submit the code to leetcode, creates a file with the code and 
 * then executes the command to submit the code. Deletes the file afterwards. 
 * Returns the output of the command or any error that occurred. 
 * 
 * 
 * @param arg   The submission argument
 * @param fileExtension The file extension of the file
 * @param code  The code to submit
 * @param isTest Whether it's a test or not
 * @returns The output of the submission
 */
async function submission(arg: submissionArgs, fileExtension: fileExtension, code: string, isTest: boolean): Promise<string> {
    if (!validateSubmissionParams(arg, fileExtension, code))
        return "Invalid test or submission arguments";

    const questionNumber = arg as number;
    const filename = await getFilename(questionNumber, fileExtension);

    // Write the file synchronously
    try {
        fs.writeFileSync(filename, code);
    } catch (err) {
        return errorMessage("Error writing file");
    }

    let output;

    try {
        if (isTest)
            output = await runCommand(`leetcode test "${filename}"`);
        else
            output = await runCommand(`leetcode submit "${filename}"`);
    } catch (err) {
        return errorMessage("Error encounted while submitting: " + err);
    }

    // Delete the file after submission
    // Don't need to show this error the user
    fs.unlink(filename, (err) => {
        if (err) console.error(err);
    });

    // Check if the submission was successful or not...
    const result = output.stdout;
    if (result.includes("Accepted")) {
        // Give the user points
    }

    return message(result);
}

/**
 * Helper method to execute commands in cli and return the output
 * @param command The command to execute
 * @returns The output of the command
 */
async function runCommand(command: string) {
    return await exec(command);
}

