import { console, prompt, process, rl } from "../mockConsole";

const salas = {
    Inicio: {
        luz: true,
        descricao: "Você está no início do labirinto",
        conexoes: {
            "L": "Labirinto1"
        }
    },
    Labirinto1: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "L": "Labirinto2",
            "S": "Labirinto4"
        }
    },
    Labirinto2: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "O": "Labirinto1",
            "S": "Labirinto5"
        }
    },
    Labirinto3: {
        luz: true,
        descricao: "Você achou uma sala com uma rachadura no teto, onde há alguns galhos e luz do sol",
        conexoes: {
            "N": "Labirinto3",
            "S": "Labirinto6"
        }
    },
    Labirinto4: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto1",
            "O": "Labirinto7",
            "L": "Labirinto5"
        }
    },
    Labirinto5: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto2",
            "O": "Labirinto4",
            "L": "Labirinto6"
        }
    },
    Labirinto6: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto3",
            "O": "Labirinto5"
        }
    },
    Labirinto7: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto7",
            "O": "Labirinto4",
            "L": "Labirinto8"
        }
    },
    Labirinto8: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto5",
            "O": "Labirinto7",
            "L": "Labirinto9"
        }
    },
    Labirinto9: {
        luz: false,
        descricao: "Todos os lados há passagens, tudo igual, não há como saber onde está.",
        conexoes: {
            "N": "Labirinto6",
            "O": "Labirinto8",
            "S": "Fim"
        }
    },
    Fim: {
        luz: true,
        descricao: "Fim do labirinto!!",
        conexoes: {
            "N": "Labirinto9"
        }
    }
};

export async function labirinto() {
    let salaAtual = salas["Inicio"];
    let lanterna = false;
    let bateria = 15;

    while(true) {
        console.log();

        if(salaAtual.luz || lanterna) {
            console.log(salaAtual.descricao);
            for(let chave in salaAtual.conexoes) {
                console.log("-", chave);
            }
        } else {
            console.log("Está tudo escuro...");
            console.log("Experimente ligar a lanterna (ligar)");
        }

        if(lanterna) {
            bateria--;
            if(bateria <= 0) {
                lanterna = false;
                console.log("Acabou a bateria da sua lanterna.");
            }
        }

        const comando = await prompt();
        if(!comando) {
            return;
        }

        if(comando == "ligar") {
            if(bateria > 0) {
                lanterna = true;
                console.log("Você ligou a lanterna.");
            } else {
                console.log("Você tenta ligar mas nada acontece.");
            }
        } else if(comando == "desligar") {
            lanterna = false;
            console.log("Você desligou a lanterna.");
        } else {
            const destino = salaAtual.conexoes[comando];
            if(destino) {
                salaAtual = salas[destino];
            } else {
                console.log("Não pode ir para lá.");
            }
        }
    }
}