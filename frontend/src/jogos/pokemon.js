//const { createInterface } = require("node:readline/promises");
import { console, prompt, process, rlPromises as term } from "../mockConsole";

export async function pokemonFireRed() {

let salaAtual = "Quarto";
let pokemon = "";
let vidaPokemon = 0;
let vidaMaximaPokemon = 0;
let tiposPokemon = [];
let ataquesPokemon = [];
let inimigoNome = "";
let vidaInimigo = 0;
let vidaMaximaInimigo = 0;
let tiposInimigo = [];
let ataquesInimigo = [];
let mochila = { pokebolas: 0 };
let equipe = [];
let jogoEncerrado = false;

const iniciais = {
    bulbasaur: {
        nome: "Bulbasaur",
        tipos: ["Grama", "Venenoso"],
        vida: 24,
        ataques: [
            { nome: "Investida", tipo: "Normal", dano: 4 },
            { nome: "Chicote de Vinha", tipo: "Grama", dano: 7 },
            { nome: "Folha Navalha", tipo: "Grama", dano: 9 }
        ]
    },
    charmander: {
        nome: "Charmander",
        tipos: ["Fogo"],
        vida: 23,
        ataques: [
            { nome: "Arranhao", tipo: "Normal", dano: 4 },
            { nome: "Brasas", tipo: "Fogo", dano: 7 },
            { nome: "Chama", tipo: "Fogo", dano: 9 }
        ]
    },
    squirtle: {
        nome: "Squirtle",
        tipos: ["Agua"],
        vida: 25,
        ataques: [
            { nome: "Investida", tipo: "Normal", dano: 4 },
            { nome: "Jato de Agua", tipo: "Agua", dano: 7 },
            { nome: "Bolhas", tipo: "Agua", dano: 8 }
        ]
    }
};

const selvagens = [
    {
        nome: "Rattata",
        tipos: ["Normal"],
        vida: 14,
        ataques: [
            { nome: "Mordida", tipo: "Normal", dano: 4 },
            { nome: "Ataque Rapido", tipo: "Normal", dano: 5 }
        ]
    },
    {
        nome: "Pidgey",
        tipos: ["Normal", "Voador"],
        vida: 15,
        ataques: [
            { nome: "Bicada", tipo: "Voador", dano: 5 },
            { nome: "Tornado", tipo: "Voador", dano: 6 }
        ]
    },
    {
        nome: "Caterpie",
        tipos: ["Inseto"],
        vida: 13,
        ataques: [
            { nome: "Investida", tipo: "Normal", dano: 3 },
            { nome: "Picada", tipo: "Inseto", dano: 5 }
        ]
    },
    {
        nome: "Geodude",
        tipos: ["Pedra", "Terra"],
        vida: 18,
        ataques: [
            { nome: "Pedrada", tipo: "Pedra", dano: 6 },
            { nome: "Tapa de Lama", tipo: "Terra", dano: 6 }
        ]
    },
    {
        nome: "Oddish",
        tipos: ["Grama", "Venenoso"],
        vida: 16,
        ataques: [
            { nome: "Absorver", tipo: "Grama", dano: 6 },
            { nome: "Acido", tipo: "Venenoso", dano: 5 }
        ]
    }
];

const tabelaTipos = {
    Normal: { forte: [], fraco: ["Pedra"] },
    Fogo: { forte: ["Grama", "Inseto"], fraco: ["Fogo", "Agua", "Pedra"] },
    Agua: { forte: ["Fogo", "Pedra", "Terra"], fraco: ["Agua", "Grama"] },
    Grama: { forte: ["Agua", "Pedra", "Terra"], fraco: ["Fogo", "Grama", "Venenoso", "Voador", "Inseto"] },
    Eletrico: { forte: ["Agua", "Voador"], fraco: ["Grama", "Eletrico"] },
    Voador: { forte: ["Grama", "Inseto"], fraco: ["Eletrico", "Pedra"] },
    Pedra: { forte: ["Fogo", "Voador", "Inseto"], fraco: ["Agua", "Grama", "Terra"] },
    Terra: { forte: ["Fogo", "Eletrico", "Pedra", "Venenoso"], fraco: ["Grama", "Inseto"] },
    Inseto: { forte: ["Grama"], fraco: ["Fogo", "Voador", "Pedra"] },
    Venenoso: { forte: ["Grama"], fraco: ["Pedra", "Terra"] }
};

function calcularDano(ataque, tiposDefensor) {
    let multiplicador = 1;
    let regra = tabelaTipos[ataque.tipo] || { forte: [], fraco: [] };

    for (const tipo of tiposDefensor) {
        if (regra.forte.includes(tipo)) {
            multiplicador = multiplicador * 2;
        }
        if (regra.fraco.includes(tipo)) {
            multiplicador = multiplicador * 0.5;
        }
    }

    let variacao = Math.floor(Math.random() * 3);
    let dano = Math.floor((ataque.dano + variacao) * multiplicador);

    if (dano < 1) {
        dano = 1;
    }

    return { dano: dano, multiplicador: multiplicador };
}

console.log("Bem-vindo ao mundo Pokemon!");
console.log("Digite os comandos mostrados na tela para jogar.");

async function jogar() {
    while (!jogoEncerrado) {
        console.log("");

        if (salaAtual == "Quarto") {
            console.log("Voce esta no seu quarto. Ha um PC no canto e uma escada para descer.");
            console.log("Comandos: interagir, descer, bolsa, equipe, encerrar");
        } else if (salaAtual == "Sala") {
            console.log("Voce esta na sala de estar. Sua mae esta por aqui.");
            console.log("Comandos: subir, sair, falar, bolsa, equipe, encerrar");
        } else if (salaAtual == "Rua") {
            console.log("Voce esta na rua da vila.");
            console.log("Comandos: laboratorio, rota1, voltar, bolsa, equipe, encerrar");
        } else if (salaAtual == "Laboratorio") {
            if (pokemon == "") {
                console.log("Professor Carvalho: Escolha seu primeiro Pokemon.");
                console.log("Comandos: bulbasaur, charmander, squirtle, sair, bolsa, equipe, encerrar");
            } else {
                console.log("Professor Carvalho: Cuide bem do seu " + pokemon + ".");
                console.log("Comandos: sair, bolsa, equipe, encerrar");
            }
        } else if (salaAtual == "Rota1") {
            console.log("Voce esta na Rota 1. Seu " + pokemon + " esta com " + vidaPokemon + "/" + vidaMaximaPokemon + " de vida.");
            console.log("Comandos: andar, seguir, voltar, bolsa, equipe, encerrar");
        } else if (salaAtual == "Batalha") {
            console.log("Batalha: " + pokemon + " " + vidaPokemon + "/" + vidaMaximaPokemon + " contra " + inimigoNome + " " + vidaInimigo + "/" + vidaMaximaInimigo);
            console.log("Tipos do inimigo: " + tiposInimigo.join("/"));
            for (let i = 0; i < ataquesPokemon.length; i++) {
                let ataque = ataquesPokemon[i];
                console.log("ataque" + (i + 1) + ": " + ataque.nome + " | Tipo: " + ataque.tipo + " | Forca: " + ataque.dano);
            }
            console.log("Comandos: atacar, ataque1, ataque2, ataque3, capturar, fugir, bolsa, equipe, encerrar");
        } else if (salaAtual == "Cidade") {
            console.log("Voce chegou a proxima cidade. Ha um Centro Pokemon logo a frente.");
            console.log("Comandos: centro, voltar, bolsa, equipe, encerrar");
        } else if (salaAtual == "Centro") {
            console.log("Voce entrou no Centro Pokemon. A enfermeira pode curar sua equipe.");
            console.log("Comandos: curar, sair, bolsa, equipe, encerrar");
        }

        const digitado = await term.question("> ");
        const comando = digitado.trim().toLowerCase();

        if (comando == "") {
            jogoEncerrado = true;
        } else if (comando == "encerrar") {
            jogoEncerrado = true;
        } else if (comando == "bolsa" || comando == "mochila") {
            console.log("Bolsa: " + mochila.pokebolas + " Pokebolas.");
        } else if (comando == "equipe") {
            if (equipe.length == 0) {
                console.log("Voce ainda nao possui Pokemon na equipe.");
            } else {
                console.log("Equipe Pokemon:");
                for (const p of equipe) {
                    console.log("- " + p.nome + " | Tipo: " + p.tipos.join("/") + " | Vida: " + p.vida + "/" + p.vidaMaxima);
                }
            }
        } else if (salaAtual == "Quarto") {
            if (comando == "interagir") {
                console.log("Voce liga o PC, mas ainda nao ha Pokemon guardados nele.");
            } else if (comando == "descer") {
                salaAtual = "Sala";
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Sala") {
            if (comando == "subir") {
                salaAtual = "Quarto";
            } else if (comando == "sair") {
                salaAtual = "Rua";
            } else if (comando == "falar") {
                console.log("Sua mae diz: 'O menino lindo, boa sorte na sua jornada!'");
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Rua") {
            if (comando == "laboratorio") {
                salaAtual = "Laboratorio";
            } else if (comando == "voltar") {
                salaAtual = "Sala";
            } else if (comando == "rota1") {
                if (pokemon == "") {
                    console.log("Voce precisa escolher um Pokemon com o professor primeiro.");
                } else {
                    salaAtual = "Rota1";
                }
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Laboratorio") {
            if (comando == "sair") {
                salaAtual = "Rua";
            } else if (iniciais[comando] && pokemon == "") {
                let escolhido = iniciais[comando];
                pokemon = escolhido.nome;
                vidaPokemon = escolhido.vida;
                vidaMaximaPokemon = escolhido.vida;
                tiposPokemon = escolhido.tipos;
                ataquesPokemon = escolhido.ataques;
                mochila.pokebolas = mochila.pokebolas + 5;
                equipe.push({ nome: pokemon, tipos: tiposPokemon, vida: vidaPokemon, vidaMaxima: vidaMaximaPokemon, ataques: ataquesPokemon });
                console.log("Voce escolheu " + pokemon + ".");
                console.log("Professor Carvalho entregou 5 Pokebolas para sua bolsa.");
            } else if (iniciais[comando] && pokemon != "") {
                console.log("Voce ja escolheu um Pokemon.");
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Rota1") {
            if (comando == "voltar") {
                salaAtual = "Rua";
            } else if (comando == "seguir") {
                salaAtual = "Cidade";
            } else if (comando == "andar") {
                let chance = Math.random();
                if (chance < 0.7) {
                    let sorteio = Math.floor(Math.random() * selvagens.length);
                    let encontrado = selvagens[sorteio];
                    inimigoNome = encontrado.nome;
                    vidaMaximaInimigo = encontrado.vida + Math.floor(Math.random() * 5);
                    vidaInimigo = vidaMaximaInimigo;
                    tiposInimigo = encontrado.tipos;
                    ataquesInimigo = encontrado.ataques;
                    console.log("Um " + inimigoNome + " selvagem apareceu!");
                    salaAtual = "Batalha";
                } else {
                    console.log("Voce andou pela grama, mas nada apareceu.");
                }
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Batalha") {
            if (comando == "fugir") {
                console.log("Voce fugiu da batalha.");
                salaAtual = "Rota1";
            } else if (comando == "capturar") {
                if (mochila.pokebolas <= 0) {
                    console.log("Voce nao tem Pokebolas.");
                } else {
                    mochila.pokebolas = mochila.pokebolas - 1;
                    let proporcaoVida = vidaInimigo / vidaMaximaInimigo;
                    let chanceCaptura = Math.floor(25 + (1 - proporcaoVida) * 65);
                    if (chanceCaptura > 90) {
                        chanceCaptura = 90;
                    }
                    let sorteio = Math.floor(Math.random() * 100) + 1;
                    console.log("Chance de captura: " + chanceCaptura + "%");
                    if (sorteio <= chanceCaptura) {
                        console.log("Voce capturou " + inimigoNome + "!");
                        equipe.push({ nome: inimigoNome, tipos: tiposInimigo, vida: vidaInimigo, vidaMaxima: vidaMaximaInimigo, ataques: ataquesInimigo });
                        salaAtual = "Rota1";
                    } else {
                        console.log(inimigoNome + " escapou da Pokebola.");
                    }
                }
            } else if (comando == "atacar" || comando == "ataque1" || comando == "ataque2" || comando == "ataque3") {
                let indiceAtaque = 0;
                if (comando == "ataque2") {
                    indiceAtaque = 1;
                }
                if (comando == "ataque3") {
                    indiceAtaque = 2;
                }

                let ataque = ataquesPokemon[indiceAtaque];

                if (!ataque) {
                    console.log("Esse ataque nao existe.");
                } else {
                    let resultado = calcularDano(ataque, tiposInimigo);
                    vidaInimigo = vidaInimigo - resultado.dano;
                    console.log(pokemon + " usou " + ataque.nome + " e causou " + resultado.dano + " de dano.");
                    if (resultado.multiplicador > 1) {
                        console.log("E super efetivo!");
                    } else if (resultado.multiplicador < 1) {
                        console.log("Nao e muito efetivo...");
                    }

                    if (vidaInimigo <= 0) {
                        console.log("Voce venceu a batalha.");
                        salaAtual = "Rota1";
                    }
                }
            } else {
                console.log("Nao pode fazer isso aqui.");
            }

            if (salaAtual == "Batalha" && vidaInimigo > 0 && comando != "fugir" && comando != "bolsa" && comando != "equipe") {
                let ataqueInimigo = ataquesInimigo[Math.floor(Math.random() * ataquesInimigo.length)];
                let resultadoInimigo = calcularDano(ataqueInimigo, tiposPokemon);
                vidaPokemon = vidaPokemon - resultadoInimigo.dano;
                equipe[0].vida = vidaPokemon;
                console.log(inimigoNome + " usou " + ataqueInimigo.nome + " e causou " + resultadoInimigo.dano + " de dano.");
                if (resultadoInimigo.multiplicador > 1) {
                    console.log("E super efetivo!");
                } else if (resultadoInimigo.multiplicador < 1) {
                    console.log("Nao e muito efetivo...");
                }

                if (vidaPokemon <= 0) {
                    console.log("Seu " + pokemon + " desmaiou. Voce voltou para casa.");
                    vidaPokemon = vidaMaximaPokemon;
                    equipe[0].vida = vidaPokemon;
                    salaAtual = "Sala";
                }
            }
        } else if (salaAtual == "Cidade") {
            if (comando == "centro") {
                salaAtual = "Centro";
            } else if (comando == "voltar") {
                salaAtual = "Rota1";
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        } else if (salaAtual == "Centro") {
            if (comando == "curar") {
                for (const p of equipe) {
                    p.vida = p.vidaMaxima;
                }
                vidaPokemon = vidaMaximaPokemon;
                equipe[0].vida = vidaPokemon;
                console.log("Todos os seus Pokemon foram curados.");
                console.log("Sua equipe esta recuperada. A jornada inicial chegou ao fim.");
                jogoEncerrado = true;
            } else if (comando == "sair") {
                salaAtual = "Cidade";
            } else {
                console.log("Nao pode fazer isso aqui.");
            }
        }
    }

    console.log("Fim!");
    term.close();
}

await jogar();
}