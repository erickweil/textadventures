//import { createInterface } from 'node:readline/promises';
import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import { getChalk } from "../../utils/chalk.js";
import { gerarChave, gerarFrutaMagica, gerarTesouro, ilhas } from './utilitarios.js';

export async function arquipelago() {
    let chalk = getChalk(true);
/*const term = createInterface({
    input: process.stdin,
    output: process.stdout
});*/

let salaAtual = "Dawn_Island";

let modoTesouro = false;
let modoChave = false;
let modoFrutaMagica = false;

let ilhaTesouro = "";
let ilhaChave = "";

let temChave = false;
let temFrutaMagica = false;
let jogoAcabou = false;

for (const nome in ilhas) {
    ilhas[nome].conexoes.explorar = explorarIlha;
}

ilhaTesouro = gerarTesouro();
ilhaChave = gerarChave(ilhaTesouro);
temFrutaMagica = gerarFrutaMagica();

console.log("=============================================\n         O ARQUIPELAGO DO TESOURO           \n=============================================\n");
console.log("Voce e um explorador que ouviu lendas sobre um tesouro escondido em alguma ilha do arquipelago. Navegue entre as ilhas, encontre a chave e descubra onde o tesouro esta enterrado.");
console.log("Feito por: Joao Guerini e Joao Bento");

while (!jogoAcabou) {
    const sala = ilhas[salaAtual];
    if (!sala) {
        console.log(chalk.bgRed.white("Caiu para fora do mundo!"));
        break;
    }

    const largura = process.stdout.columns || 45;
    console.log("─".repeat(largura));

    if (modoFrutaMagica) {
        jogoAcabou = await handleFrutaMagica();
        continue;
    }

    if (modoTesouro) {
        jogoAcabou = await handleTesouro();
        continue;
    }

    if (modoChave) {
        jogoAcabou = await handleChave();
        continue;
    }

    sala.descricao();

    for (const chave in sala.conexoes) {
        console.log("-", chave[0].toUpperCase() + chave.slice(1));
    }

    const comando = (await term.question("> ")).trim().toLowerCase();
    if (!comando) break;

    if (comando === "sair") {
        console.log("Saindo do jogo...");
        jogoAcabou = true;
        break;
    }

    const destinoFn = sala.conexoes[comando];
    if (destinoFn) {
        const destino = destinoFn();
        if (destino) salaAtual = destino;
    } else {
        console.log(chalk.bgRed.white("Nao pode ir para la"));
    }
}

term.close();

// Funcoes que lidam com cada modo 

async function handleFrutaMagica() {
    console.log(chalk.bgHex('#2d0057').white(' Dentro do bau, uma fruta magica pulsa com uma luz estranha. '));
    console.log("- comer");
    console.log("- ignorar");

    const comando = (await term.question("> ")).trim().toLowerCase();
    if (!comando) return true;

    if (comando === "comer") {
        console.log(chalk.bgHex('#2d0057').white('Voce comeu a fruta magica e seu corpo nao resistiu ao poder... Voce morreu! '));
        return true;
    } else if (comando === "ignorar") {
        console.log(chalk.bgBlueBright('Voce ignorou a fruta e pegou o tesouro! Parabens, voce venceu o jogo! '));
        return true;
    } else {
        console.log(chalk.bgRed.white("Essa interacao nao existe rs."));
        return false;
    }
}

async function handleTesouro() {
    console.log(chalk.bgGreen.black(' O bau de tesouro esta diante de voce. '));
    console.log("- abrir");
    console.log("- voltar");

    const comando = (await term.question("> ")).trim().toLowerCase();
    if (!comando) return true;

    if (comando === "abrir") {
        if (temChave) {
            if (temFrutaMagica) {
                console.log("Voce abriu o bau e encontrou uma fruta magica brilhante!");
                modoFrutaMagica = true;
            } else {
                console.log("Voce abriu o bau de tesouro! Parabens, voce venceu o jogo!");
                return true;
            }
        } else {
            console.log(chalk.bgYellow.black(' O bau esta trancado. Voce precisa de uma chave. '));
        }
    } else if (comando === "voltar") {
        modoTesouro = false;
    } else {
        console.log(chalk.bgRed.white("Essa interacao nao existe rs."));
    }

    return false;
}

async function handleChave() {
    console.log(chalk.bgYellow.black(' A chave dourada esta diante de voce. '));
    console.log("- pegar");
    console.log("- voltar");

    const comando = (await term.question("> ")).trim().toLowerCase();
    if (!comando) return true;

    if (comando === "pegar") {
        if (!temChave) {
            temChave = true;
            modoChave = false;
            console.log("Voce pegou a chave dourada!");
        } else {
            console.log("Voce ja tem a chave.");
        }
    } else if (comando === "voltar") {
        modoChave = false;
    } else {
        console.log(chalk.bgRed.white("Essa interacao nao existe rs."));
    }

    return false;
}

// Funcao atribuida a todas as ilhas na propriedade conexoes de cada objeto de ilha
// Responsavel por verificar se a ilha atual possui alguma interacao com os itens do jogo e consequentemente ativar os modos

function explorarIlha() {
    if (salaAtual === ilhaTesouro) {
        modoTesouro = true;
    } else if (salaAtual === ilhaChave && !temChave) {
        modoChave = true;
    } else {
        console.log(chalk.bgRed.white(' Voce explora a ilha mas nao encontra nada de interesse. '));
    }
}
}