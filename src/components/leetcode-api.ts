import util from "util";
import { exec as _exec } from "child_process";
import fs from "fs";
import { questionArgs, submissionArgs } from "../utils/lc-types";
const exec = util.promisify(_exec);

export async function getQuestion(arg: questionArgs) {
    // check if the argument is a difficulty
    const output = await runCommand(`leetcode show ${arg}`);
    return output.stdout;
}

export async function submit(arg: submissionArgs, code: string) {
    // TODO: validate params here 
    return await submission(arg, code, false);
}

export async function test(arg: submissionArgs, code: string) {
    // TODO: Validate params here
    return await submission(arg, code, true);
}

// helper function to get the filename from the question number
async function getFilename(questionNumber: number, fileExtension: string): Promise<string> {
    // Get the question title from leetcode API 
    const output = await runCommand(`leetcode show ${questionNumber}`);
    const title = output.stdout.split("\n")[0].split("]")[1];
    // filename format is always [question number].[question title].[file extension]
    return `${questionNumber}.${title.replace(/\s/g, "_")}.${fileExtension}`;
}

// Helper function to help submission and tests
async function submission(arg: submissionArgs, code: string, isTest: boolean) {
    let filename = "";
    const fileExtension = code.split("\n")[0].split("````")[1];

    if (typeof arg === "number") {
        filename = await getFilename(arg, fileExtension);
    } else {
        // TODO: Get current challenge number from database
    }

    // Write the file synchronously
    try {
        fs.writeFileSync(filename, code);
    } catch (err) {
        console.error(err);
    }

    let output;

    if (isTest) {
        output = await runCommand(`leetcode test ${arg}`);
    } else {
        output = await runCommand(`leetcode submit ${arg}`);
    }

    // Delete the file after submission
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
