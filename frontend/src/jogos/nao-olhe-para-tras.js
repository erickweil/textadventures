//import { createInterface } from 'node:readline/promises';
//import chalk from 'chalk';
import { console, prompt, process, rlPromises as term } from "../mockConsole";
import { getChalk } from "../utils/chalk";

export async function naoOlheParaTras() {
    const chalk = getChalk(true);
/*const term = createInterface({
    input: process.stdin,
    output: process.stdout
});*/

let salaAtual = "SalaRecepcao";
let jogadorVivo = true;
let jogadorEscapou = false; 
let chaveEncontrada = false;

let fantasmaSala = "";
let chaveSala = "";
let chaveLugar = "";

const esconderijos = {
    Cozinha: ["mesa", "pia"],
    Sala: ["painel", "sofa"],
    Quarto: ["cama", "escrivaninha"],
    Banheiro: ["armario", "pia"]
};

const esconderijosSeguros = {
    SalaRecepcao: "Atras porta",
    Cozinha: "Dentro do armario de suprimentos",
    Sala: "Atras do sofa",
    Quarto: "Dentro do guarda-roupa",
    Banheiro: "Dentro do box"
};

const esconderijosPerigosos = {
    SalaRecepcao: {
        "Embaixo da mesa": "Seus pés ficaram aparecendo embaixo da mesa.",
        "Atras da cortina": "Seus pés ficaram aparecendo.."
    },
    Cozinha: {
        "Dentro da geladeira": "Você bateu a porta da geladeira e fez muito barulho.",
        "Embaixo da mesa": "O fantasma viu sua sombra no chão."
    },
    Sala: {
        "Embaixo do sofa": "O sofá era pequeno demais para esconder você.",
        "Atras do painel": "O painel rangeu e chamou atenção do fantasma."
    },
    Quarto: {
        "Embaixo da cama": "O fantasma viu seus pés embaixo da cama.",
        "Embaixo da escrivaninha": "A cadeira caiu e fez barulho."
    },
    Banheiro: {
        "Atras da pia": "O espelho refletiu você.",
        "Dentro do armario": "A porta do armário não fechou completamente."
    }
};

const mapa = {
    SalaRecepcao: ["Cozinha", "Banheiro", "Sala", "Quarto"],
    Cozinha: ["SalaRecepcao", "Sala", "Banheiro"],
    Sala: ["Cozinha", "Quarto", "SalaRecepcao"],
    Quarto: ["Sala", "Banheiro", "SalaRecepcao"],
    Banheiro: ["Cozinha", "Quarto", "SalaRecepcao"]
};

function sortearChave() {
    const salas = Object.keys(esconderijos);
    chaveSala = salas[Math.floor(Math.random() * salas.length)];
    const locais = esconderijos[chaveSala];
    chaveLugar = locais[Math.floor(Math.random() * locais.length)];
}

function moverFantasma() {
    const salas = Object.keys(mapa);
    fantasmaSala = salas[Math.floor(Math.random() * salas.length)];
}

async function verificarFantasma() {
    if (fantasmaSala !== salaAtual) {
        return false;
    }

    console.log("\n...");
    console.log("Você sente um frio na espinha.");
    console.log("O fantasma entrou no cômodo.");

    const esconderijoSeguro = esconderijosSeguros[salaAtual];
    const opcoesPerigosas = esconderijosPerigosos[salaAtual];
    const chavesPerigosas = Object.keys(opcoesPerigosas);
    
    const esconderijoPerigoso = chavesPerigosas[Math.floor(Math.random() * chavesPerigosas.length)];
    const motivo = opcoesPerigosas[esconderijoPerigoso];

    console.log("\nEsconda-se rápido!");
    if(Math.random() > 0.5) {
        console.log(`- ${esconderijoSeguro}`);
        console.log(`- ${esconderijoPerigoso}`);
    } else {
        console.log(`- ${esconderijoPerigoso}`);        
        console.log(`- ${esconderijoSeguro}`);
    }

    const resposta = await term.question("> ");
    const escolha = resposta.trim().toLowerCase();

    if (escolha === esconderijoSeguro.toLowerCase()) {
        console.log("\nVocê conseguiu se esconder.");
        console.log("O fantasma saiu do cômodo.");
        return true;
    }

    if (escolha === esconderijoPerigoso.toLowerCase()) {
        console.log("\nO fantasma encontrou você...");
        console.log(motivo); 
        jogadorVivo = false;
        return true;
    }

    console.log("\nVocê hesitou por tempo demais ou digitou errado.");
    console.log("O fantasma alcançou você.");
    jogadorVivo = false;
    return true;
}

function procurarItem(sala, local) {
    console.log(chalk.blueBright(`\nVocê procura em ${local}...`));

    if (chaveEncontrada) {
        console.log(chalk.yellowBright("Você já encontrou a chave."));
        return null;
    }

    if (chaveSala === sala && chaveLugar === local) {
        console.log(chalk.greenBright("🔑 Você encontrou a chave!"));
        chaveEncontrada = true;
    } else {
        console.log(chalk.gray("Não encontrou nada."));
    }
    return null;
}
        
const salas = {
    SalaRecepcao: {
        descricao: () => {
            console.log(chalk.magentaBright("\n=== SALA DE RECEPÇÃO ===\n"));
            console.log(chalk.white("Você vê:"));
            console.log(chalk.blueBright("➜  Cozinha"));
            console.log(chalk.blueBright("➜  Sala"));
            console.log(chalk.blueBright("➜  Quarto"));
            console.log(chalk.blueBright("➜  Banheiro"));
            console.log(chalk.blueBright("➜  Abrir Porta"));
        },
        conexoes: {
            "🚶 Cozinha": () => "Cozinha",
            "🚶 Sala": () => "Sala",
            "🚶 Quarto": () => "Quarto",
            "🚶 Banheiro": () => "Banheiro",
            "🚪 Abrir Porta": () => {
                if (chaveEncontrada) {
                    console.log(chalk.greenBright("\nVocê usou a chave."));
                    console.log(chalk.greenBright("A porta destrancou."));
                    console.log(chalk.greenBright("Você escapou da casa."));
                    jogadorEscapou = true;
                    jogadorVivo = false;
                    return null;
                } else {
                    console.log(chalk.yellowBright("\nA porta está trancada."));
                    console.log(chalk.yellow("Você precisa encontrar a chave."));
                    return null;
                }
            }
        }
    },
    Cozinha: {
        descricao: () => {
            console.log(chalk.magentaBright("\n=== COZINHA ===\n"));
            console.log(chalk.white("Você vê:"));
            console.log(chalk.blueBright("➜  Recepcao"));
            console.log(chalk.blueBright("➜  Sala"));
            console.log(chalk.blueBright("➜  Banheiro"));
            console.log(chalk.blueBright("➜  Procurar na mesa"));
            console.log(chalk.blueBright("➜  Procurar na pia"));
        },
        conexoes: {
            "🚶 Recepcao": () => "SalaRecepcao",
            "🚶 Sala": () => "Sala",
            "🚶 Banheiro": () => "Banheiro",
            "🔍 Procurar na mesa": () => procurarItem("Cozinha", "mesa"),
            "🔍 Procurar na pia": () => procurarItem("Cozinha", "pia")
        }
    },
    Sala: {
        descricao: () => {
            console.log(chalk.magentaBright("\n=== SALA ===\n"));
            console.log(chalk.white("Você vê:"));
            console.log(chalk.blueBright("➜  Cozinha"));
            console.log(chalk.blueBright("➜  Quarto"));
            console.log(chalk.blueBright("➜  Recepcao"));
            console.log(chalk.blueBright("➜  Procurar no painel"));
            console.log(chalk.blueBright("➜  Procurar no sofa"));
        },
        conexoes: {
            "🚶 Cozinha": () => "Cozinha",
            "🚶 Quarto": () => "Quarto",
            "🚶 Recepcao": () => "SalaRecepcao",
            "🔍 Procurar no painel": () => procurarItem("Sala", "painel"),
            "🔍 Procurar no sofa": () => procurarItem("Sala", "sofa")
        }
    },
    Quarto: {
        descricao: () => {
            console.log(chalk.magentaBright("\n=== QUARTO ===\n"));
            console.log(chalk.white("Você vê:"));
            console.log(chalk.blueBright("➜  Sala"));
            console.log(chalk.blueBright("➜  Banheiro"));
            console.log(chalk.blueBright("➜  Recepcao"));
            console.log(chalk.blueBright("➜  Procurar na cama"));
            console.log(chalk.blueBright("➜  Procurar na escrivaninha"));
        },
        conexoes: {
            "🚶 Sala": () => "Sala",
            "🚶 Banheiro": () => "Banheiro",
            "🚶 Recepcao": () => "SalaRecepcao",
            "🔍 Procurar na cama": () => procurarItem("Quarto", "cama"),
            "🔍 Procurar na escrivaninha": () => procurarItem("Quarto", "escrivaninha")
        }
    },
    Banheiro: {
        descricao: () => {
            console.log(chalk.magentaBright("\n=== BANHEIRO ===\n"));
            console.log(chalk.white("Você vê:"));
            console.log(chalk.blueBright("➜  Cozinha"));
            console.log(chalk.blueBright("➜  Quarto"));
            console.log(chalk.blueBright("➜  Recepcao"));
            console.log(chalk.blueBright("➜  Procurar no armario"));
            console.log(chalk.blueBright("➜  Procurar na pia"));
        },
        conexoes: {
            "🚶 Cozinha": () => "Cozinha",
            "🚶 Quarto": () => "Quarto",
            "🚶 Recepcao": () => "SalaRecepcao",
            "🔍 Procurar no armario": () => procurarItem("Banheiro", "armario"),
            "🔍 Procurar na pia": () => procurarItem("Banheiro", "pia")
        }
    }
};

while (true) {
    salaAtual = "SalaRecepcao"; 
    jogadorVivo = true;
    chaveEncontrada = false;

    sortearChave();

    console.clear();
    console.log(chalk.redBright("================================"));
    console.log(chalk.redBright("        NÃO OLHE PARA TRÁS"));
    console.log(chalk.redBright("================================"));
    console.log("\nVocê e seus amigos encontram uma casa abandonada.");
    console.log("Por curiosidade, você entra sozinho.");
    console.log("Ao entrar a porta bate violentamente atrás de você.");
    console.log("Agora você precisa encontrar a chave para escapar.\n");
    console.log(chalk.redBright("CUIDADO: Você não está sozinho na casa.\nAlguém te observa na escuridão."));

    while (jogadorVivo) {
        const sala = salas[salaAtual];

        if (!sala) {
            console.log("Erro na sala.");
            break;
        }

        sala.descricao();

        console.log("\nAções disponíveis:");
        for (const chave in sala.conexoes) {
            console.log("-", chave);
        }

        const comandoCru = await term.question("\n> ");
        const comando = comandoCru.trim().toLowerCase();
        
        const chaveEncontradaMenu = Object.keys(sala.conexoes).find(
            k => k.toLowerCase().replace(/[^a-z0-strancadoáéíóúãõç ]/g, '').trim() === comando || k.toLowerCase().trim() === comando
        );

        const acao = sala.conexoes[chaveEncontradaMenu || comandoCru];

        if (acao) {
            const destino = acao();
            if (destino) {
                salaAtual = destino;
            }
            
            moverFantasma();
            const fantasmaApareceu = await verificarFantasma();
            if (fantasmaApareceu && !jogadorVivo) {
                break;
            }
        } else {
            console.log(chalk.yellowBright("\n⚠ Não é possível fazer isso."));
            console.log(chalk.yellow("Escolha uma ação válida."));
        }
    }

    console.log(chalk.redBright("\n================================"));
    console.log(chalk.redBright("          FIM DE JOGO"));
    console.log(chalk.redBright("================================"));

    const reiniciar = await term.question(chalk.yellowBright("\nDeseja jogar novamente? (s/n)"));
    if (reiniciar.toLowerCase() !== "s") {
        break;
    }
}

term.close();
}