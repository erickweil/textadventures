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

term.open(document.getElementById('xterm-container'));

// Make the terminal's size and geometry fit the size of #terminal-container
fitAddon.fit();
window.addEventListener('resize', () => fitAddon.fit());

export function _prompt() {
    command = '';
    term.write('\r\n> ');
}

export function termPrint(...str) {
    for(let s of str) {
        if(!s) continue;
        term.write((""+s).replaceAll("\n","\r\n")+" ");
    }
    term.writeln(" ");
}

export function termPrintRaw(str) {
    term.write((""+str)?.replaceAll("\n","\r\n") || "");
}

export function termClear() {
    term.clear();
}

let waitingPrompt = null;
export function prompt(...str) {
    command = '';
    const last = str.pop() || "> ";
    termPrint(...str);
    
    term.write(last);
    return new Promise((resolve, reject) => {
        waitingPrompt = (input) => {
            waitingPrompt = null;
            if(input instanceof Error) {
                reject(input);
            }
            resolve(input);
        };
    });
}

let command = '';
let commands = {};

export function addCommand(cmd, config) {
    commands[cmd] = config;
}

function onInput(term, text) {
    text = text?.trim() || "";

    if(waitingPrompt) {
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
        term.writeln(`${command}: é oq? digite 'ajuda' para mais informações`);
    }
    _prompt();
}

function runFakeTerminal() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                _prompt();
                if(waitingPrompt) {
                    waitingPrompt(new Error("Ctrl + C"));   
                }
                break;
            case '\r': // Enter
                onInput(term, command);
                command = '';
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    if (command.length > 0) {
                        command = command.slice(0, command.length - 1);
                    }
                }
                break;
            default: // Print all other characters for demo
                if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    command += e;
                    term.write(e);
                }
        }
    });
}

runFakeTerminal();