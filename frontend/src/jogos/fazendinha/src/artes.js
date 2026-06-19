import { console, prompt, process, rlPromises as term } from "../../../mockConsole";
import { getChalk } from "../../../utils/chalk";
const chalk = getChalk(true);

// Paleta de cores da Fazenda
const R = chalk.bgRed("  ");            // Vermelho
const r = chalk.bgHex("#ff8888")("  "); // Vermelho claro
const M = chalk.bgHex("#8B4513")("  "); // Marrom
const m = chalk.bgHex("#D2B48C")("  "); // Marrom claro
const G = chalk.bgGreen("  ");          // Verde
const g = chalk.bgHex("#90EE90")("  "); // Verde claro
const Y = chalk.bgYellow("  ");         // Amarelo
const B = chalk.bgBlue("  ");           // Azul
const C = chalk.bgCyan("  ");           // Ciano
const W = chalk.bgWhite("  ");          // Branco
const K = chalk.bgBlack("  ");          // Preto
const A = chalk.bgGray("  ");           // Cinza
const _ = "  ";                         // Transparente

const dicionarioArtes = {
    maca: [
        [_, _, _, G, M, _, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, R, R, R, R, _, _],
        [_, R, r, R, R, R, R, _],
        [_, R, R, R, R, R, R, _],
        [_, R, R, R, R, R, R, _],
        [_, _, R, R, R, R, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    tomate: [
        [_, _, G, G, G, _, _, _],
        [_, G, G, G, G, _, _, _],
        [_, _, R, R, R, R, _, _],
        [_, R, R, R, R, R, R, _],
        [_, R, R, R, R, R, R, _],
        [_, R, R, R, R, R, R, _],
        [_, _, R, R, R, R, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    minhoca: [
        [_, _, _, _, _, _, _, _],
        [_, _, r, r, _, _, _, _],
        [_, r, _, _, r, _, _, _],
        [r, _, _, _, _, r, _, _],
        [r, _, _, _, _, _, r, r],
        [_, r, r, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    grama: [
        [_, _, _, _, _, _, _, _],
        [_, G, _, _, _, G, _, _],
        [_, G, _, G, _, G, _, _],
        [_, G, _, G, _, G, _, G],
        [G, G, _, G, G, G, _, G],
        [G, G, G, G, G, G, G, G],
        [G, G, G, G, G, G, G, G],
        [M, M, M, M, M, M, M, M]
    ],
    espantalho: [
        [_, _, M, M, M, _, _, _],
        [_, _, m, K, m, _, _, _],
        [_, _, m, m, m, _, _, _],
        [_, Y, B, B, B, Y, _, _],
        [Y, _, B, B, B, _, Y, _],
        [_, _, B, B, B, _, _, _],
        [_, _, M, _, M, _, _, _],
        [_, _, M, _, M, _, _, _]
    ],
    fogo: [
        [_, _, _, R, _, _, _, _],
        [_, _, R, Y, R, _, _, _],
        [_, R, Y, Y, R, _, _, _],
        [_, R, Y, Y, Y, R, _, _],
        [R, R, Y, Y, Y, R, R, _],
        [R, R, R, Y, R, R, R, _],
        [_, R, R, R, R, R, _, _],
        [_, M, M, M, M, M, _, _]
    ],
    carta: [
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [W, W, W, W, W, W, W, W],
        [W, A, W, W, W, W, A, W],
        [W, W, A, W, W, A, W, W],
        [W, W, W, A, A, W, W, W],
        [W, R, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W]
    ],
    enxada: [
        [_, _, _, _, _, A, A, A],
        [_, _, _, _, _, A, A, A],
        [_, _, _, _, M, _, _, _],
        [_, _, _, M, _, _, _, _],
        [_, _, M, _, _, _, _, _],
        [_, M, _, _, _, _, _, _],
        [M, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    vassoura: [
        [_, _, _, _, _, _, M, _],
        [_, _, _, _, _, M, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, M, _, _, _, _],
        [_, _, M, _, _, _, _, _],
        [_, Y, Y, Y, _, _, _, _],
        [Y, Y, Y, Y, Y, _, _, _],
        [Y, Y, Y, Y, Y, _, _, _]
    ],
    zzz: [
        [_, _, C, C, C, _, _, _],
        [_, _, _, _, C, _, _, _],
        [_, _, _, C, _, _, _, _],
        [_, _, C, C, C, _, _, _],
        [C, C, _, _, _, _, _, _],
        [_, C, _, _, _, _, _, _],
        [C, C, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    vaca: [
        [_, M, _, _, _, M, _, _],
        [W, W, W, W, W, W, W, _],
        [W, K, W, W, W, K, W, _],
        [W, W, W, W, W, W, W, _],
        [_, W, K, W, K, W, _, _],
        [_, r, r, r, r, r, _, _],
        [_, r, K, r, K, r, _, _],
        [_, r, r, r, r, r, _, _]
    ],
    gota: [
        [_, _, _, B, _, _, _, _],
        [_, _, B, C, B, _, _, _],
        [_, B, C, C, B, B, _, _],
        [B, C, C, C, C, C, B, _],
        [B, C, C, C, C, C, B, _],
        [B, C, C, C, C, C, B, _],
        [_, B, B, B, B, B, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    martelo: [
        [_, _, _, A, A, A, A, _],
        [_, _, _, A, A, A, A, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, _, M, _, _, _],
        [_, _, _, _, _, _, _, _]
    ],
    arvore: [
        [_, _, G, G, G, _, _, _],
        [_, G, G, g, G, G, _, _],
        [G, G, g, g, G, G, G, _],
        [G, G, G, G, G, G, G, _],
        [_, G, G, G, G, G, _, _],
        [_, _, _, M, _, _, _, _],
        [_, _, _, M, _, _, _, _],
        [_, _, _, M, _, _, _, _]
    ],
    caixote: [
        [_, M, M, M, M, M, M, _],
        [M, m, m, m, m, m, m, M],
        [M, m, M, m, m, M, m, M],
        [M, m, m, M, M, m, m, M],
        [M, m, m, M, M, m, m, M],
        [M, m, M, m, m, M, m, M],
        [M, m, m, m, m, m, m, M],
        [_, M, M, M, M, M, M, _]
    ],
    jornal: [
        [_, _, _, _, _, _, _, _],
        [_, W, W, W, W, W, W, _],
        [_, W, K, K, W, K, W, _],
        [_, W, K, K, W, W, W, _],
        [_, W, W, W, W, W, W, _],
        [_, W, K, K, K, K, W, _],
        [_, W, W, W, W, W, W, _],
        [_, _, _, _, _, _, _, _]
    ],
    lareira: [
        [M, M, M, M, M, M, M, M],
        [R, m, R, m, R, m, R, m],
        [m, R, K, K, K, K, R, m],
        [R, m, K, K, K, K, m, R],
        [m, R, K, W, W, K, R, m],
        [R, m, A, W, W, A, m, R],
        [m, R, A, A, A, A, R, m],
        [M, M, M, M, M, M, M, M]
    ],
    regador: [
        [_, _, B, B, B, _, _, _],
        [_, B, C, _, _, B, _, _],
        [_, B, B, B, B, B, _, B],
        [_, B, C, C, C, B, A, _],
        [_, B, C, C, C, B, _, _],
        [A, A, B, B, B, B, _, _],
        [_, A, _, _, _, _, _, _],
        [_, _, A, _, _, _, _, _]
    ],
    balde: [
        [_, _, _, A, A, _, _, _],
        [_, _, A, _, _, A, _, _],
        [_, A, B, B, B, B, A, _],
        [_, A, B, B, B, B, A, _],
        [_, A, A, A, A, A, A, _],
        [_, _, A, A, A, A, _, _],
        [_, _, A, A, A, A, _, _],
        [_, _, _, _, _, _, _, _]  
    ],
};

export default function desenharArte(nome) {
    if (!dicionarioArtes[nome]) return;
    console.log("");
    for (const linha of dicionarioArtes[nome]) {
        console.log("    " + linha.join(""));
    }
    console.log("");
}