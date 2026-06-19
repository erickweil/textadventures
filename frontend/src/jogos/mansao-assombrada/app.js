/* Alunos: João Carlos, Vitor Castaman & David De Souza */
import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import { salasMansao } from "./salas/mansao.js";
import { ESTADO } from "./estado.js";
import { getChalk } from "../../utils/chalk.js";


let chalk = getChalk(true);
export async function mansaoAssombrada() {

// Resetar jogo
ESTADO.salaAtual = "Quarto";
ESTADO.pegarChave = false;
ESTADO.pegarBateria = false;
ESTADO.monstroPerto = false;
ESTADO.quartoAberto = true;
ESTADO.garagemAberta = false;
ESTADO.banheiroAberto = false;
ESTADO.radioLigado = false;

// Salas do jogo
const salas = {
  ...salasMansao,
}; 

let { salaAtual } = ESTADO;

// Loop principal do jogo, onde o jogo acontece
while (true) {
  // 1. Mostrar a descrição da sala atual
  const sala = salasMansao[salaAtual];
  if (!sala) {
    console.log(chalk.red("Caiu para fora do mundo!"));
    break;
  }

  console.log();
  sala.descricao();
  for (const chave in sala.conexoes) {
    console.log(chalk.blue("-", chave));
  }

  // 2. Esperar o comando para o jogador
  const comando = await term.question(chalk.cyan("> "));
  if (!comando) {
    break;
  }

  const destinoFn = sala.conexoes[comando];
  if (destinoFn) {
    const destino = await destinoFn();
    if (destino) {
      salaAtual = destino;
    }
  } else {
    console.log(chalk.red("Não pode ir para lá"));
  }
}

console.log(chalk.green("Fim!"));
term.close();
}