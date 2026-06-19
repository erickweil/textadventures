import { console, prompt, process, rlPromises as term } from "../../../mockConsole";
import { getChalk } from "../../../utils/chalk";
//import chalk from "chalk";
//import PromptSync from "prompt-sync";

//let prompt = PromptSync();

const chalk = getChalk(true);

export default async function entrada(txt, estilo = "red") {
    return await prompt(chalk[estilo](txt));
}
