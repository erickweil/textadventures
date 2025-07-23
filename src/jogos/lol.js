//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function lol() {

let vidaRecuperada = false;
let ajudouGaren = false;
let introducaoExibida = false;

const nomesRotasPadrao = {
    "N": "Avançar",
    "S": "Base Aliada",
    "L": "Bot",
    "O": "Top",
    "gank": "Ajudar Garen",
};

const salas = {
    Mid: {
        descricao: () => {
            return '📍 Você está na rota Mid.';
        },
        conexoes: {
            "N": () => {
                if (ajudouGaren) {
                    console.log("LeBlanc: Não acredito que fui derrotada por uma simples Vastaya...");
                    console.log("✔️ LEBLANC FOI ELIMINADA!");
                    console.log("\nAvançando para Base Inimiga.");
                    return "BaseInimiga";
                } else {
                    console.log("LeBlanc: Saia do meu caminho, Vastaya.");
                    console.log("❌ VOCÊ FOI ELIMINADO!");
                    console.log("Ahri: Parece que ainda não sou forte o bastante...");
                    console.log("\nRetornando para Base Aliada.");
                    return "BaseAliada";
                }
            },
            "S": () => {
                console.log("Indo para Base Aliada.");
                return "BaseAliada";
            },
            "L": () => {
                console.log("Indo para Bot.");
                return "Bot";
            },
            "O": () => {
                console.log("Indo para Top.");
                return "Top";
            }
        }
    },

    BaseAliada: {
        descricao: () => {
            vidaRecuperada = true;
            return "📍 Você está na Base Aliada. \n✨ VIDA RECUPERADA!";
        },
        conexoes: {
            "O": () => {
                console.log("Indo para Top.");
                return "Top";
            },
            "N": () => {
                console.log("Indo para Mid.");
                return "Mid";
            },
            "L": () => {
                console.log("Indo para Bot.");
                return "Bot";
            }
        }
    },

    Top: {
        descricao: () => {
            if (!ajudouGaren) {
                return "📍 Você está na rota Top.\nGaren: Por favor, me ajude a derrotar Darius?!";
            } else {
                return "✔️ DARIUS FOI ELIMINADO! \nGaren: Obrigado, Ahri! Siga comigo pois juntos somos mais fortes!";
            }
        },
        conexoes: {
            ...(ajudouGaren ? {} : {
                "Ajudar": () => {
                    ajudouGaren = true;
                    return "Top";
                }
            }),
            "S": () => {
                console.log("Indo para Base Aliada.");
                return "BaseAliada";
            },
            "L": () => {
                console.log("Indo para Mid.");
                return "Mid";
            },
            "N": () => {
                if (ajudouGaren) {
                    console.log("Indo para Base Inimiga.");
                    return "BaseInimiga";
                } else {
                    console.log("🚫 Você não pode avançar sem derrotar Darius.");
                    return "Top";
                }
            }
        }
    },

    Bot: {
        descricao: () => {
            console.log("📍 Você está na rota Bot.");
            console.log("Rakan: Veja se não é a Vastaya queridinha haha");
            console.log("Xayah: Não precisamos de sua ajuda!");
            console.log("Ahri: :( Parece que devo voltar para Mid...");
            console.log("\nRetornando para Mid.");
            return "Mid";
        },
        conexoes: {
            "S": () => {
                console.log("Indo para Base Aliada.");
                return "BaseAliada";
            },
            "O": () => {
                console.log("Indo para Mid.");
                return "Mid";
            }
        }
    },

    BaseInimiga: {
        descricao: () => {
            if (ajudouGaren) {
                console.log("📍 Você está na Base Inimiga.");
                console.log("\n✔️ VOCÊ DESTRUIU O NEXUS INIMIGO!");
                console.log("🎉 VITÓRIA!");
                process.exit();
            } else {
                console.log("📍 Você está na Base Inimiga.");
                console.log("\n❌ VOCÊ FOI ELIMINADO!");
                console.log("Ahri: Preciso ficar mais forte para vencer...");
                console.log("\nRetornando para Base Aliada.");
                return "BaseAliada";
            }
        },
        conexoes: {}
    }
};

let posicao = "Mid";

while (true) {
    console.log("\n" + "=".repeat(30) + "\n");

    if (!introducaoExibida) {
        console.log("BEM-VINDO À SUMMONER'S RIFT!\n");
        console.log("Ahri: Olá, invocador! Vamos explorar Summoner's Rift e enfrentar emocionantes desafios?\n");
        introducaoExibida = true;
    }

    const salaAtual = salas[posicao];
    let proximaPosicao = posicao;

    const retornoDescricao = salaAtual.descricao();
    if (salas[retornoDescricao]) {
        proximaPosicao = retornoDescricao;
    } else {
        if (retornoDescricao) console.log(retornoDescricao + "\n");
    }

    if (proximaPosicao !== posicao) {
        posicao = proximaPosicao;
        continue;
    }

    console.log("Comandos disponíveis:");
    const salaParaExibirComandos = salas[posicao];

    for (const chave in salaParaExibirComandos.conexoes) {
        if (posicao === "Top" && ajudouGaren && chave === "Ajudar") {
            continue;
        }

        let nomeExibicao = nomesRotasPadrao[chave] || "";

        if (posicao === "BaseAliada" && chave === "N") {
            nomeExibicao = "Mid";
        } else if (posicao === "Top" && chave === "L") {
            nomeExibicao = "Mid";
        } else if (posicao === "Bot" && chave === "O") {
            nomeExibicao = "Mid";
        }

        console.log(`- ${chave} -> ${nomeExibicao}`);
    }
    console.log("");

    const comando = (await prompt("Digite um comando: ")).trim();
    const destinoFunc = salaParaExibirComandos.conexoes[comando];

    if (destinoFunc) {
        const destino = destinoFunc();
        if (salas[destino]) {
            posicao = destino;
        }
    } else {
        console.log("🚫 Comando inválido.\n");
    }
}
}