import { prompt as termPrompt, termClear, termPrint, termPrintRaw } from "./terminal";

export const console = { log: termPrint, error: termPrint, clear: termClear };

export const rl = {
    close: () => {},
    question: (str: string, callback: (v: unknown) => undefined) => {
        termPrompt(str).then((v) => callback(v));
    }
};

export const rlPromises = {
    close: () => {},
    question: (str: string) => {
        return termPrompt(str);
    }
}

export const process = {
    stdout: {
        write: (str: unknown) => {
            termPrintRaw(str);
        }
    },
    exit: (code: unknown) => {
        throw new Error("Encerrou com código:"+code);
    }
};

export const prompt = termPrompt;