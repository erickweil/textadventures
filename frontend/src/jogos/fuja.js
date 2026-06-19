//const prompt = require("prompt-sync")();
import { console, prompt, process } from "../mockConsole";

export async function fuja() {

// VARIÁVEIS
// ====================

let salaAtual = "refeitorio";
let inventario = [];

let portaoAberto = false;
let segurancaSedado = false;
let jogoAtivo = true;

// MAPA
// ====================

const salas = {

    refeitorio: {
        nome: "REFEITÓRIO",
        descricao:
            "O gerador explodiu e o hospital está sem energia.\n" +
            "Pacientes estão em pânico.\n" +
            "Há saídas para o corredor principal e para a ala dos quartos.",

        caminhos: {
            corredor: "corredor",
            quartos: "ala_quartos"
        },

        item: null
    },

    corredor: {
        nome: "CORREDOR PRINCIPAL",
        descricao:
            "Um corredor escuro que leva ao jardim.",

        caminhos: {
            refeitorio: "refeitorio",
            jardim: "jardim"
        },

        item: "lanterna"
    },

    ala_quartos: {
        nome: "ALA DOS QUARTOS",
        descricao:
            "Corredor onde ficam os quartos dos pacientes.",

        caminhos: {
            refeitorio: "refeitorio",
            deposito: "deposito",
            enfermaria: "enfermaria"
        },

        item: null
    },

    deposito: {
        nome: "DEPÓSITO",
        descricao:
            "Caixas e materiais de limpeza estão espalhados.",

        caminhos: {
            voltar: "ala_quartos"
        },

        item: "chave"
    },

    enfermaria: {
        nome: "ENFERMARIA",
        descricao:
            "Uma enfermaria silenciosa com medicamentos.",

        caminhos: {
            voltar: "ala_quartos"
        },

        item: "sedativo"
    },

    jardim: {
        nome: "JARDIM",
        descricao:
            "Um jardim próximo ao mar.\n" +
            "Existe um portão fechado que leva ao cais.",

        caminhos: {
            corredor: "corredor"
        },

        item: null
    },

    cais: {
        nome: "CAIS",
        descricao:
            "Um pequeno barco está preso ao píer.",

        caminhos: {
            jardim: "jardim"
        },

        item: null
    }
};


// FUNÇÕES
// ====================

function mostrarSala() {

    console.log("\n================================");
    console.log(salas[salaAtual].nome);
    console.log("================================");

    console.log(salas[salaAtual].descricao);

    if (salas[salaAtual].item !== null) {
        console.log("\nItem visível:", salas[salaAtual].item);
    }

    console.log("\nLocais disponíveis:");

    for (let destino in salas[salaAtual].caminhos) {
        console.log("- ir " + destino);
    }

    console.log("\nOutros comandos:");
    console.log("- pegar [item]");
    console.log("- abrir portao");
    console.log("- usar sedativo");
    console.log("- inventario");
    console.log("- entrar barco");
    console.log("- sair");
}

function mover(destino) {

    if (salas[salaAtual].caminhos[destino]) {

        salaAtual = salas[salaAtual].caminhos[destino];

        mostrarSala();

    } else {

        console.log("Você não pode ir para esse local.");
    }
}

function pegar(item) {

    if (salas[salaAtual].item === item) {

        inventario.push(item);

        salas[salaAtual].item = null;

        console.log("Item obtido:", item);

    } else {

        console.log("Esse item não está aqui.");
    }
}

function mostrarInventario() {

    console.log("\nINVENTÁRIO");

    if (inventario.length === 0) {

        console.log("Vazio");

    } else {

        for (let i = 0; i < inventario.length; i++) {
            console.log("- " + inventario[i]);
        }
    }
}

function abrirPortao() {

    if (salaAtual !== "jardim") {

        console.log("Não há portão aqui.");
        return;
    }

    if (!inventario.includes("chave")) {

        console.log("Você precisa da chave.");
        return;
    }

    portaoAberto = true;

    salas.jardim.caminhos.cais = "cais";

    console.log("Você abriu o portão.");
}

function usarSedativo() {

    if (!inventario.includes("sedativo")) {

        console.log("Você não possui sedativo.");
        return;
    }

    if (salaAtual !== "jardim") {

        console.log("Não há ninguém para sedar aqui.");
        return;
    }

    segurancaSedado = true;

    console.log(
        "Você seda um segurança que observava o acesso ao cais."
    );
}

function finalJogo() {

    console.log("\n================================");
    console.log("FINAL");
    console.log("================================");

    console.log(
        "\nVocê entra no barco e deixa a ilha para trás."
    );

    console.log(
        "O mar parece cada vez mais estranho..."
    );

    console.log(
        "As vozes desaparecem."
    );

    console.log(
        "A escuridão desaparece."
    );

    console.log(
        "\nVocê abre os olhos."
    );

    console.log(
        "Está deitado em uma cama da enfermaria."
    );

    console.log(
        "A explosão nunca aconteceu."
    );

    console.log(
        "A fuga nunca aconteceu."
    );

    console.log(
        "Você nunca saiu do hospital."
    );

    console.log(
        "Tudo era uma alucinação provocada pela sua esquizofrenia."
    );

    console.log("\nFIM DE JOGO.");

    jogoAtivo = false;
}


// INÍCIO
// ====================

console.log("================================");
console.log("FUGA DA ILHA PSIQUIÁTRICA");
console.log("================================");

console.log(
    "\nUma explosão atinge o gerador principal."
);

console.log(
    "O hospital fica completamente sem energia."
);

console.log(
    "Você está sentado no refeitório."
);

console.log(
    "Talvez seja a oportunidade perfeita para fugir."
);

mostrarSala();


// LOOP PRINCIPAL
// ====================

while (jogoAtivo) {
    let comando = (await prompt("> ")).toLowerCase();

    let partes = comando.split(" ");

    if (partes[0] === "ir") {

        mover(partes[1]);
    }

    else if (partes[0] === "pegar") {

        pegar(partes[1]);
    }

    else if (comando === "inventario") {

        mostrarInventario();
    }

    else if (comando === "abrir portao") {

        abrirPortao();
    }

    else if (comando === "usar sedativo") {

        usarSedativo();
    }

    else if (comando === "entrar barco") {

        if (salaAtual !== "cais") {

            console.log("Não existe barco aqui.");
        }

        else if (!segurancaSedado) {

            console.log(
                "Os funcionários ainda observam o cais."
            );
        }

        else {

            finalJogo();
        }
    }

    else if (comando === "sair") {

        jogoAtivo = false;
    }

    else {

        console.log("Comando inválido.");
    }
}

}