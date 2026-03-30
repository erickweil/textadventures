// Adaptado de https://github.com/xtermjs/xtermjs.org/blob/master/js/demo.js
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

const term = new Terminal({
    cursorBlink: true,
    fontFamily: "monospace",
    allowProposedApi: true
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById('xterm-container')!);

// Make the terminal's size and geometry fit the size of #terminal-container
fitAddon.fit();
window.addEventListener('resize', () => fitAddon.fit());

export function _prompt() {
    command = '';
    term.write('\r\n> ');
}

export function termPrint(...str: unknown[]) {
    for (let s of str) {
        if (!s) continue;
        term.write(("" + s).replaceAll("\n", "\r\n") + " ");
    }
    term.writeln(" ");
}

export function termPrintRaw(str: unknown) {
    term.write(("" + str)?.replaceAll("\n", "\r\n") || "");
}

export function termClear() {
    term.clear();
}

let optionsMode = false;
let options: string[] = [];
let lastPromptStr: unknown[] = [];
let waitingPrompt: ((input: string | Error) => void) | null = null;
export function prompt(...str: unknown[]): Promise<string> {
    command = optionsMode ? (options[0] || "") : "";
    lastPromptStr = [...str];

    const last = str.pop() || "> ";
    if (str.length > 0) {
        termPrint(...str);
    }
    term.write("" + last + command);
    return new Promise<string>((resolve, reject) => {
        waitingPrompt = (input: string | Error) => {
            waitingPrompt = null;
            if (input instanceof Error) {
                reject(input);
            } else {
                resolve(input);
            }
        };
    });
}

let passwordMode = false;
export async function passwordPrompt(...str: unknown[]) {
    try {
        passwordMode = true;
        const result = await prompt(...str);
        return result;
    } finally {
        passwordMode = false;
    }
}

export async function optionsPrompt(_options: string[], ...str: unknown[]) {
    if (_options.length === 0) throw new Error("Nenhuma opção fornecida");
    try {
        optionsMode = true;
        options = _options;
        return await prompt(...str);
    } finally {
        optionsMode = false;
        options = [];
    }
}

export function termPrintAbovePrompt(...str: unknown[]) {
    if (waitingPrompt === null) {
        termPrint(...str);
        return;
    }
    // Move cursor to the beginning of the line
    term.write('\r');
    // Clear the line
    term.write('\x1b[2K');
    // Print the message
    termPrint(...str);
    // Reprint the prompt and command
    const promptBefore = [...lastPromptStr];
    const last = promptBefore.pop() || "> ";
    if (promptBefore.length > 0) {
        termPrint(...promptBefore);
    }
    term.write("" + last + command);
}

let command = '';
type ComandConfig = {
    f: (...args: string[]) => void | Promise<void>,
    help?: string
}
let commands: Record<string, ComandConfig> = {};

export function addCommand(cmd: string, config: ComandConfig) {
    commands[cmd] = config;
}

function onInput(term: Terminal, text: string) {
    text = text?.trim() || "";

    if (waitingPrompt) {
        term.writeln("");
        waitingPrompt(text);
        return;
    }

    const args = text?.split(' ') || [];
    const command = args?.shift() || "";
    if (command.length > 0) {
        term.writeln('');
        if (command in commands) {
            let promise = commands[command].f(...args);
            if (promise && promise.then) {
                promise.then(() => {
                    _prompt();
                });
            }
            if (promise && promise.catch) {
                promise.catch((err) => {
                    termPrint("Erro:", err?.toString());
                    _prompt();
                });
            }
            return;
        }
        term.writeln(`${command}: é oq? digite 'ajuda' para mais informações`);
    }
    _prompt();
}

const commandHistory: string[] = [];
let historyIndex: number = 0;

let suggestions: string[] = [];

export function addSuggestions(words: string[]) {
    suggestions.push(...words);
}

let activeSuggestions: string[] = [];

export function setActiveSuggestions(words: string[]) {
    activeSuggestions = words;
}

export function clearActiveSuggestions() {
    activeSuggestions = [];
}

function runFakeTerminal() {
    if ((term as any)._initialized) {
        return;
    }

    (term as any)._initialized = true;

    (term as any).prompt = () => {
        term.write('\r\n$ ');
    };

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                _prompt();
                if (waitingPrompt) {
                    waitingPrompt(new Error("Ctrl + C"));
                }
                break;
            case '\r': // Enter
                if (!optionsMode) {
                    if (command.trim().length > 0) {
                        commandHistory.push(command);
                    }
                    historyIndex = commandHistory.length; // Reseta o índice para o final
                }
                onInput(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if ((term as any)._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.slice(0, command.length - 1);
                    }
                }
                break;
            case '\x1b[A': // Seta para Cima
                if (optionsMode) {
                    // Cicla pelas opções
                    const currentOption = command.trim().toLowerCase() || options[0].toLowerCase();
                    let currentIndex = options.findIndex(o => o.toLowerCase() === currentOption);
                    currentIndex = (currentIndex - 1 + options.length) % options.length;
                    // Limpa a linha atual
                    for (let i = 0; i < command.length; i++) {
                        term.write('\b \b');
                    }
                    command = options[currentIndex];
                    term.write(command);
                } else {
                    if (historyIndex > 0) {
                        historyIndex--;
                        // Limpa a linha atual
                        for (let i = 0; i < command.length; i++) {
                            term.write('\b \b');
                        }
                        command = commandHistory[historyIndex];
                        term.write(command);
                    }
                }
                break;

            case '\x1b[B': // Seta para Baixo
                if (optionsMode) {
                    // Cicla pelas opções
                    const currentOption = command.trim().toLowerCase() || options[0].toLowerCase();
                    let currentIndex = options.findIndex(o => o.toLowerCase() === currentOption);
                    currentIndex = (currentIndex + 1) % options.length;
                    // Limpa a linha atual
                    for (let i = 0; i < command.length; i++) {
                        term.write('\b \b');
                    }
                    command = options[currentIndex];
                    term.write(command);
                } else if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    // Limpa a linha atual
                    for (let i = 0; i < command.length; i++) {
                        term.write('\b \b');
                    }
                    command = commandHistory[historyIndex];
                    term.write(command);
                } else if (historyIndex === commandHistory.length - 1) {
                    // Se estiver no último item, ir para baixo limpa o comando
                    historyIndex++;
                    for (let i = 0; i < command.length; i++) {
                        term.write('\b \b');
                    }
                    command = "";
                }
                break;
            case '\t':
                if (!optionsMode) {
                    const todasSugestoes = activeSuggestions.length > 0
                        ? [...activeSuggestions]                          // dentro do jogo
                        : [...Object.keys(commands), ...suggestions];    // fora do jogo

                    const match = todasSugestoes.find(n => n.startsWith(command));
                    if (match) {
                        for (let i = 0; i < command.length; i++) {
                            term.write('\b \b');
                        }
                        command = match;
                        term.write(command);
                    }
                }
                break;
                break;
            default: // Print all other characters for demo
                if (optionsMode) {
                    // apaga a última opção
                    for (let i = 0; i < command.length; i++) {
                        term.write('\b \b');
                    }
                    command = "";
                }
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(passwordMode ? "*" : e);
                }
        }
    });
}

runFakeTerminal();