import { prompt as termPrompt, termClear, termPrint, termPrintRaw } from "./terminal";

export const console = { log: termPrint, error: termPrint, clear: termClear };

export const rl = {
    close: () => {},
    question: (str, callback) => {
        termPrompt(str).then((v) => callback(v));
    }
};

export const process = {
    stdout: {
        write: (str) => {
            termPrintRaw(str);
        }
    },
    exit: (code) => {
        throw new Error("Encerrou com código:"+code);
    }
};

export const prompt = termPrompt;