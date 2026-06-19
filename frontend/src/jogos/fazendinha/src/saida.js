import { getChalk } from "../../../utils/chalk";
import { console, prompt, process, rlPromises as term } from "../../../mockConsole";

const chalk = getChalk(true);
export default function escreva(txt, estilo = "yellow") {
    console.log(chalk[estilo](txt));
}
