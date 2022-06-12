import dotenv from "dotenv";

dotenv.config();

export const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
export const PREFIX = '!';
export const CODE_SPLITTER = "```";