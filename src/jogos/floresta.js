
//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function floresta() {

let inventario = [];

const mapa = {
    Entrada: {
        descricao: () => "Você está na entrada de uma floresta. Há caminhos para o NORTE e para o LESTE.",
        conexoes: {
            "N": () => "Trilha",
            "L": () => "Clareira"
        },
        item: "Mapa rasgado"
    },
    Trilha: {
        descricao: () => "Essa trilha é estreita e entre rochas. O vento forte sopra a LESTE. Você vê uma fruta de aparência estranha em um arbusto.",
        conexoes: {
            "S": () => "Entrada",
            "L": () => "Tronco"
        },
        item: "Fruta" 
    },
    Clareira: {
        descricao: () => "Clareira silenciosa. Um animal selvagem bloqueia o caminho para NORTE. Uma corda está no chão.",
        conexoes: {
            "O": () => "Entrada",
            "N": () => {
                const sala = mapa["Clareira"];
                if (sala.obstaculo) {
                    console.log("O animal selvagem está bloqueando o caminho. Você precisa fazer algo a respeito.");
                    return "Clareira";
                }
                return "Lama"
            }
        },
        item: "Corda",
        obstaculo: "Animal selvagem"
    },
    Tronco: {
        descricao: () => {
            if (mapa.Tronco.obstaculo) {
                return "Um tronco gigante cheio de galhos está bloqueando o caminho para OESTE. Um machado está aqui.";
            }
            
            return "O caminho para OESTE está livre. Onde antes havia galhos, agora há uma passagem clara.";
        },
        conexoes: {
            "O": () => {
                const sala = mapa["Tronco"];
                if (sala.obstaculo) {
                    console.log("Os galhos bloqueiam o caminho. Você precisa de algo para cortá-los.");
                    return "Tronco";
                }
                return "Trilha";
            }
        },
        item: "Machado",
        obstaculo: "Galhos fechando"
    },
    Lama: {
        descricao: () => {
            if (mapa.Lama.obstaculo) {
                return "Você está diante de um lamaçal fundo. Parece fundo demais para atravessar.";
            }
            return "Você está do outro lado do lamaçal. O caminho para o SUL está livre.";
        },
        conexoes: {
            "S": () => {
                const sala = mapa["Lama"];
                if (sala.obstaculo) {
                    console.log("A lama é muito funda para atravessar.");
                    return "Lama";
                }
                return "Ponte";
            },
            "N": () => "Clareira"
        },
        obstaculo: "Lama profunda"
    },
    Ponte: {
        descricao: () => {
            if (mapa.Ponte.obstaculo) {
                return "Ponte de pedra natural que cruza um pequeno riacho. A ponte parece instável.";
            }
            return "A ponte agora está segura graças à sua corda. O caminho para o NORTE leva a uma caverna.";
        },
        conexoes: {
            "N": () => {
                const sala = mapa["Ponte"];
                if (sala.obstaculo) {
                    console.log("A ponte não parece segura sem apoio.");
                    return "Ponte";
                }
                return "Caverna";
            }
        },
        item: null, 
        obstaculo: "Madeira instável"
    },
    Caverna: {
        descricao: () => {
            if (!mapa.Caverna.obstaculo) {
                return "A caverna está iluminada pela sua tocha. O caminho para OESTE está visível.";
            }
            if (!mapa.Caverna.item) {
                return "Caverna escura e úmida. O canto onde a tocha estava agora está vazio. A escuridão à frente é total.";
            }
            
            return "Caverna escura e úmida. Uma tocha está em um canto. A escuridão à frente é total.";
        },
        conexoes: {
            "O": () => {
                const sala = mapa["Caverna"];
                if (sala.obstaculo) {
                    console.log("Está escuro demais para ver o caminho.");
                    return "Caverna";
                }
                return "Saida";
            }
        },
        item: "Tocha",
        obstaculo: "Escuridão total"
    },
    Saida: {
        descricao: () => "Você saiu da floresta! Parabéns, você venceu!",
        conexoes: {}
    }
};

let localAtual = "Entrada";

function pegar() {
    const sala = mapa[localAtual];
    if (sala.item) {
        console.log("Você pegou: " + sala.item);
        inventario.push(sala.item);
        sala.item = null;
    } else {
        console.log("Nada para pegar aqui.");
    }
}

function usar(item) {

    const itemLowerCase = item.toLowerCase();
    const sala = mapa[localAtual];
    const itemNoInventario = inventario.find(i => i.toLowerCase() === itemLowerCase);

    if (!itemNoInventario) {
        console.log(`Você não tem "${item}".`);
        return;
    }

    let usou = false;
    if (sala.obstaculo === "Galhos fechando" && itemLowerCase === "machado") {
        sala.obstaculo = null;
        console.log("Você cortou os galhos com o machado.");
        usou = true;
    }
    if (sala.obstaculo === "Animal selvagem" && itemLowerCase === "fruta") {
        sala.obstaculo = null;
        console.log("Você jogou a fruta para o animal, que está distraído comendo, liberando o caminho.");
        usou = true;
    }
    if (sala.obstaculo === "Lama profunda" && itemLowerCase === "corda") {
        sala.obstaculo = null;
        console.log("Você usou a corda para atravessar a lama.");
        usou = true;
    }
    if (sala.obstaculo === "Madeira instável" && itemLowerCase === "corda") { 
        sala.obstaculo = null;
        console.log("Você usou a corda para se apoiar na ponte e atravessar.");
        usou = true;
    }
    if (sala.obstaculo === "Escuridão total" && itemLowerCase === "tocha") {
        sala.obstaculo = null;
        console.log("Você acendeu a tocha e o caminho está iluminado.");
        usou = true;
    }

    if (!usou) {
        console.log(`Não adianta usar "${item}" aqui.`);
    }
}

while (true) {
    const sala = mapa[localAtual];
    console.log("\nVocê está em: " + localAtual);
    console.log(sala.descricao());
    if (sala.item) {
        console.log("Você vê: " + sala.item);
    }
    console.log("Comandos: pegar, usar [item], N, S, L, O, inventario, sair");

    const entrada = (await prompt("> ")).toLowerCase();
    if (!entrada) break;

    const partes = entrada.split(' ');
    const acao = partes[0];
    const alvo = partes.slice(1).join(' ');

    if (acao === "pegar") {
        pegar();
    } else if (acao === "usar") {
        if (!alvo) {
            console.log("O que você quer usar?");
        } else {
            usar(alvo);
        }
    } else if (["n", "s", "l", "o"].includes(acao)) {
        
        const direcao = acao.toUpperCase();
        const proximo = sala.conexoes[direcao];
        if (proximo) {
            localAtual = proximo();
            if (localAtual === "Saida") { 
                console.log(mapa[localAtual].descricao());
                break;
            }
        } else {
            console.log("Você não pode ir nessa direção.");
        }
    } else if (acao === "inventario") {
        if (inventario.length > 0) {
            console.log("Você está carregando: " + inventario.join(", "));
        } else {
            console.log("Seu inventário está vazio.");
        }
    } else if (acao === "sair") {
        console.log("Obrigado por jogar!");
        break;
    } else {
        console.log("Comando inválido.");
    }
} 

}