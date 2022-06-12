import util from "util";
import { exec as _exec } from "child_process";
import fs from "fs";
import { fileExtension, questionArgs, submissionArgs } from "../utilities/lc-types";
const exec = util.promisify(_exec);

export async function getQuestion(arg: questionArgs) {
    // check if the argument is a difficulty
    const output = await runCommand(`leetcode show ${arg}`);
    return output.stdout;
}

export async function submit(arg: submissionArgs, language: fileExtension, code: string) {
    return await submission(arg, language, code, false);
}

export async function test(arg: submissionArgs, language: fileExtension, code: string) {
    return await submission(arg, language, code, true);
}

// helper function to get the filename from the question number
async function getFilename(questionNumber: number, fileExtension: string): Promise<string> {
    // Get the question title from leetcode API 
    const output = await getQuestion(questionNumber);
    const title = output.split("\n")[0].split("]")[1].trim();
    // filename format is always [question number].[question title].[file extension]
    return `${questionNumber}.${title}.${fileExtension}`;
}

function validateSubmissionParams(arg: submissionArgs, fileExtension: fileExtension, code: string) {
    if (arg == null || fileExtension == null || code == null) {
        return false;
    }
    return true;
}

// Helper function to help submission and tests
async function submission(arg: submissionArgs, fileExtension: fileExtension, code: string, isTest: boolean) {
    if (!validateSubmissionParams(arg, fileExtension, code))
        return "Invalid test or submission arguments";

    const questionNumber = arg as number;
    const filename = await getFilename(questionNumber, fileExtension);

    // Write the file synchronously
    try {
        fs.writeFileSync(filename, code);
    } catch (err) {
        return "Error writing file";
    }

    let output;

    try {
        if (isTest) {
            output = await runCommand(`leetcode test "${filename}"`);
        } else {
            output = await runCommand(`leetcode submit "${filename}"`);
        }
    } catch (err) {
        return "Error encounted while submitting: " + err;
    }

    // // Delete the file after submission
    fs.unlink(filename, (err) => {
        if (err) console.error(err);
    });

    return output.stdout;
}

/**
 * Helper method to execute commands in cli and return the output
 * @param command The command to execute
 * @returns The output of the command
 */
async function runCommand(command: string) {
    return await exec(command);
}
