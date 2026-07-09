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

let command = '';
let cursorIndex = 0;
let optionsMode = false;
let options: string[] = [];
let lastPromptStr: unknown[] = [];
let waitingPrompt: ((input: string | Error) => void) | null = null;
let passwordMode = false;

function refreshLine() {
    // Esconde o cursor para evitar o "ghosting" branco no prompt
    term.write('\x1b[?25l');
    
    // Move cursor to the beginning of the line and Clear the line
    term.write('\r\x1b[2K');
    
    // Reprint the prompt
    const promptBefore = [...lastPromptStr];
    const last = promptBefore.pop() || "> ";
    if(promptBefore.length > 0) {
        termPrintRaw(promptBefore.join(" ") + " ");
    }
    term.write("" + last);
    
    // Escreve o comando atual
    const displayCmd = passwordMode ? "*".repeat(command.length) : command;
    term.write(displayCmd);

    // Move o cursor para a posição correta antes de mostrá-lo novamente
    const movesBack = command.length - cursorIndex;
    if (movesBack > 0) {
        term.write(`\x1b[${movesBack}D`);
    }
    
    // Mostra o cursor novamente
    term.write('\x1b[?25h');
}

export function _prompt() {
    command = '';
    cursorIndex = 0;
    term.write('\r\n> ');
}

export function termPrint(...str: unknown[]) {
    for(let s of str) {
        if(!s) continue;
        term.write((""+s).replaceAll("\n","\r\n")+" ");
    }
    term.writeln(" ");
}

export function termPrintRaw(str: unknown) {
    term.write((""+str)?.replaceAll("\n","\r\n") || "");
}

export function termClear() {
    term.clear();
}

export function prompt(...str: unknown[]): Promise<string> {
    command = optionsMode ? (options[0] || "") : "";
    cursorIndex = command.length;
    lastPromptStr = [...str];

    const last = str.pop() || "> ";
    if(str.length > 0) {
        termPrint(...str);
    }    
    term.write(""+last+command);
    return new Promise<string>((resolve, reject) => {
        waitingPrompt = (input: string | Error) => {
            waitingPrompt = null;
            if(input instanceof Error) {
                reject(input);
            } else {
                resolve(input);
            }
        };
    });
}

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
    if(_options.length === 0) throw new Error("Nenhuma opção fornecida");
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
    if(waitingPrompt === null) {
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
    refreshLine();
}

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

    if(waitingPrompt) {
        term.writeln("");
        waitingPrompt(text);
        return;
    }

    const args = text?.split(' ') || [];
    const cmdName = args?.shift() || "";
    if (cmdName.length > 0) {
        term.writeln('');
        if (cmdName in commands) {
            let promise = commands[cmdName].f(...args);
            if(promise && promise.then) {
                promise.then(() => {
                    _prompt();
                });
            }
            if(promise && promise.catch) {
                promise.catch((err) => {
                    termPrint("Erro:", err?.toString());
                    _prompt();
                });
            } 
            return;
        }
        term.writeln(`${cmdName}: é oq? digite 'ajuda' para mais informações`);
    }
    _prompt();
}

const commandHistory: string[] = [];
let historyIndex: number = 0;

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
                command = '';
                cursorIndex = 0;
                _prompt();
                if(waitingPrompt) {
                    waitingPrompt(new Error("Ctrl + C"));   
                }
                break;
            case '\r': // Enter
                if(!optionsMode) {
                    if (command.trim().length > 0) {
                        commandHistory.push(command);
                    }
                    historyIndex = commandHistory.length; // Reseta o índice para o final
                }
                onInput(term, command);
                command = '';
                cursorIndex = 0;
                break;
            case '\u007F': // Backspace (DEL)
                if (cursorIndex > 0) {
                    command = command.slice(0, cursorIndex - 1) + command.slice(cursorIndex);
                    cursorIndex--;
                    refreshLine();
                }
                break;
            case '\x1b[D': // Seta para Esquerda
                if (cursorIndex > 0) {
                    cursorIndex--;
                    refreshLine();
                }
                break;
            case '\x1b[C': // Seta para Direita
                if (cursorIndex < command.length) {
                    cursorIndex++;
                    refreshLine();
                }
                break;
            case '\x1b[A': // Seta para Cima
                if(optionsMode) {
                    // Cicla pelas opções
                    const currentOption = command.trim().toLowerCase() || options[0].toLowerCase();
                    let currentIndex = options.findIndex(o => o.toLowerCase() === currentOption);
                    currentIndex = (currentIndex - 1 + options.length) % options.length;
                    command = options[currentIndex];
                    cursorIndex = command.length;
                    refreshLine();
                } else {
                    if (historyIndex > 0) {
                        historyIndex--;
                        command = commandHistory[historyIndex];
                        cursorIndex = command.length;
                        refreshLine();
                    }
                }
                break;

            case '\x1b[B': // Seta para Baixo
                if(optionsMode) {
                    // Cicla pelas opções
                    const currentOption = command.trim().toLowerCase() || options[0].toLowerCase();
                    let currentIndex = options.findIndex(o => o.toLowerCase() === currentOption);
                    currentIndex = (currentIndex + 1) % options.length;
                    command = options[currentIndex];
                    cursorIndex = command.length;
                    refreshLine();
                } else if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    command = commandHistory[historyIndex];
                    cursorIndex = command.length;
                    refreshLine();
                } else if (historyIndex === commandHistory.length - 1) {
                    // Se estiver no último item, ir para baixo limpa o comando
                    historyIndex++;
                    command = "";
                    cursorIndex = 0;
                    refreshLine();
                }
            break;
            default: // Print all other characters for demo
                if(optionsMode) {
                    // apaga a última opção
                    command = "";
                    cursorIndex = 0;
                }
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command = command.slice(0, cursorIndex) + e + command.slice(cursorIndex);
                    cursorIndex += e.length;
                    refreshLine();
                }
        }
    });
}

runFakeTerminal();