import { getChalk } from "../../../utils/chalk.js";
import { console, prompt, process, rlPromises as term } from "../../../mockConsole";
import { ESTADO } from "../estado.js";
import { ExecutarMonstro } from '../monstro/desenho.js';


/**
 * Define as salas do jogo
 *
 * A função descricao deve escrever com console.log para o jogador o que ele vê na sala.
 *
 * A função de cada conexão deve retornar uma string que é o nome da sala para onde o jogador irá
 * (se não retornar nada mantém na mesma sala)
 */

let chalk = getChalk(true);
export const salasMansao = {
  Quarto: {
    descricao: () => {
      console.log(chalk.gray("Você acorda deitado no chão de madeira de um quarto escuro."));
      console.log(chalk.gray("Sua cabeça dói."));
      console.log(chalk.gray("O ar é pesado."));
      console.log(chalk.gray("Existe um cheiro forte de mofo e ferrugem."));
      console.log(chalk.gray("A única luz do ambiente vem de uma lâmpada piscando no teto."));
      console.log(chalk.cyan("Há uma cama velha no canto."));
      console.log(chalk.cyan("Um armário quebrado encostado na parede."));
      console.log(chalk.gray("A janela está coberta por tábuas."));
      console.log(chalk.green("A porta do quarto está entreaberta."));
      console.log(chalk.white.bold("Você sente que não está sozinho."));
    },
    conexoes: {
      "esconder na cama": async () => {
        if (!ESTADO.quartoAberto) {
          await ExecutarMonstro();
          console.log("Você rapidamente se esconde de baixo da cama, mas começa a ouvir passos se aproximando.");
          console.log("O monstro consegue te enxergar de baixo da cama.");
          console.log(chalk.red("Você perdeu!"));
          process.exit();
        } else {
          console.log("Você se esconde de baixo da cama.");
        }
      },
      "esconder no armário": async () => {
        if (!ESTADO.quartoAberto) {
          console.log("Você se esconde dentro do armário quebrado, mas começa a ouvir passos se aproximando.");
          console.log("Você sente uma presença assustadora próxima do armário.");
        } else {
            console.log("Você se esconde no armário.")
          }
      },
      "abrir": async () => {
        if (!ESTADO.quartoAberto) {
          ESTADO.quartoAberto = false;
          console.log("Você abre a porta do quarto e enxerga um corredor escuro.");
        } else {
          console.log("A porta já está aberta.");
        }
      },
      "fechar": async () => {
        if (ESTADO.quartoAberto) {
          ESTADO.quartoAberto = false;
          console.log("Você fecha a porta do quarto, mas algo nota a sua presença.");
          console.log("O monstro consegue te ouvir e começa a ir em direção ao quarto.");
        } else {
          console.log("A porta já está fechada.");
        }
      },
      "entrar": async () => {
        if (ESTADO.quartoAberto) {
          console.log("Você entra no corredor.");
          return "Corredor";
        } else {
          console.log("A porta do quarto está fechada. Você não pode entrar no corredor.");
        }
      }
    },
  },
  Corredor: {
    descricao: async () => {
      if (Math.random() > 0.1) {
        console.log(chalk.gray("O corredor principal está quase completamente escuro."));
        console.log(chalk.gray("As luzes piscam sem parar."));
        console.log(chalk.gray("Portas velhas se espalham pelos dois lados da parede."));
        console.log(chalk.white.bold("Você consegue ouvir passos distantes..."));
        console.log(chalk.white.bold("Mas não sabe de onde vêm."));
      } else {
          await ExecutarMonstro();
          console.log(chalk.red("Você perdeu!"));
          process.exit();
      }
    },
    conexoes: {
      "porta 1": () => "Cozinha",
      "porta 2": () => "Biblioteca",
      "porta 3": () => "Oficina",
      "voltar": () => "Quarto",
    },
  },
  Cozinha: {
    descricao: () => {
      console.log(chalk.gray("A cozinha está destruída."));
      console.log(chalk.gray("Pratos quebrados cobrem o chão."));
      console.log(chalk.gray("Insetos caminham sobre restos de comida podre."));
      console.log(chalk.gray("A geladeira está aberta."));
      console.log(chalk.gray("Algo pinga lentamente dentro da pia."));
      console.log(chalk.green("Existe uma porta pequena nos fundos."));
      console.log(chalk.cyan("Há um rádio antigo em cima do balcão."));
    },
    conexoes: {
      "entrar": async () => {
        if (ESTADO.banheiroAberto) {
          console.log("Assim que você entra no banheiro, uma sensação de frio percorre seu corpo.");
          return "Banheiro";
        } else {
          console.log("A porta do banheiro está fechada. Você não pode entrar.");
        }
      },
      "abrir": async () => {
        if (!ESTADO.banheiroAberto) {
          ESTADO.banheiroAberto = true;
          console.log("Você abre a porta do banheiro e enxerga um banheiro sujo.");
        } else {
          console.log("A porta do banheiro já está aberta.");
        }
      },
      "voltar": async () => "Corredor",
      "ligar": async () => {
        if (ESTADO.radioLigado == false) {
          ESTADO.radioLigado = true;
          console.log("Você liga o rádio.");
          console.log('"...não...abra...a...por...""...ele...ouve...tudo...""...fuja...enquanto...ainda-"[estatica]..."');
        } else {
          console.log("[estatica]...");
        }
      },
    },
    
  },
  Banheiro: {
    descricao: () => {
      console.log(chalk.gray("O banheiro é frio e silencioso."));
      console.log(chalk.gray("O espelho acima da pia está rachado."));
      console.log(chalk.gray("Por um instante..."));
      console.log(chalk.white.bold("Você vê um vulto atrás de você no reflexo."));
      console.log(chalk.white.bold("Mas quando se vira, não há ninguém."));
    },
    conexoes: {
      "voltar": async () => "Cozinha",
      "abrir": async () => {
        if (!ESTADO.banheiroAberto) {
          ESTADO.banheiroAberto = true;
          console.log("Você abre a porta do banheiro e enxerga a cozinha.");
        } else {
          console.log("A porta do banheiro já está aberta.");
        }
      },
      "fechar": async () => {
        if (ESTADO.banheiroAberto) {
          ESTADO.banheiroAberto = false;
          console.log("Você fecha a porta do banheiro, e se esconde atrás dela, mas o monstro consegue te ouvir e começa a ir em direção ao banheiro.");
          console.log("O monstro começa a arranhar a porta freneticamente, tentando entrar no banheiro.");
          console.log("Você consegue ouvir o monstro se afastando, mas sabe que ele ainda está por perto.");
        } else {
          console.log("A porta do banheiro já está fechada.");
        }
      },
    },
  },
  Biblioteca: {
    descricao: () => {
      console.log(chalk.gray("As estantes da biblioteca vão até o teto."));
      console.log(chalk.gray("Livros antigos estão espalhados pelo chão."));
      console.log(chalk.cyan("Um dos livros parece mais limpo que os outros."));
      console.log(chalk.gray("Existe algo estranho nesta sala."));
      console.log(chalk.cyan("Você nota um tapete que parece ter sido arrastado recentemente."));
    },
    conexoes: {
      "pegar": async () => {
        console.log("Você encontra um diário escondido atrás da estante.");
        console.log("As páginas estão manchadas.");
        console.log("Em uma delas está escrito:");
        console.log(chalk.cyan('"Ele não era humano quando o encontramos no porão..."'));
        console.log("A última página termina no meio da frase.");
      },
      "puxar": async () => {
        console.log("Você puxa o tapete e revela uma escada que desce para o porão.");
        console.log("Você desce os degraus e encontra-se no porão.");
        return "Porao";
      },
      "voltar": async () => "Corredor",
    },
  },
  Porao: {
    descricao: () => {
      console.log(chalk.gray("O porão é completamente escuro."));
      console.log(chalk.gray("O cheiro de umidade é sufocante."));
      console.log(chalk.gray("Correntes penduradas no teto balançam devagar."));
      console.log(chalk.white.bold("Você escuta uma respiração pesada em algum lugar da escuridão."));
      console.log(chalk.yellow("Você vê algo blilhante no chão."));
    },
    conexoes: {
      "pegar": async () => {
        if (ESTADO.pegarChave === false) {
          ESTADO.pegarChave = true;
          console.log("Você encontra uma chave enferrujada no chão.");
          console.log("Talvez ela abra alguma porta da casa.");
        } else {
          console.log("Você já tem a chave.");
        }
      },
      "subir": async () => "Biblioteca",
      "explorar": async () => {
        await ExecutarMonstro();
        console.log("Você se aventura mais fundo no porão, mas a escuridão é total.");
        console.log("De repente, você sente algo agarrar seu tornozelo.");
        console.log("Você tenta se soltar, mas a criatura é forte.");
        console.log(chalk.red("Você perdeu!"));
        process.exit();
      },
    },
  },
  Oficina: {
    descricao: () => {
      console.log(chalk.gray("Ferramentas enferrujadas cobrem a bancada."));
      console.log(chalk.cyan("Existe uma caixa de ferramentas aberta no chão."));
      console.log(chalk.gray("A parede possui marcas profundas..."));
      console.log(chalk.gray("Como se algo tivesse arranhado o concreto."));
      console.log(chalk.green("No final da sala, uma porta chama sua atenção."));
    },
    conexoes: {
      "pegar": async () => {
        if (ESTADO.pegarBateria === false) {
          ESTADO.pegarBateria = true;
          console.log("Você encontra uma bateria velha dentro da caixa de ferramentas.");
          console.log("Mas imediatamente você ouve um grito ensurdecedor, ELE ESTÁ PERTO!");
        } else {
          console.log("Você já tem a bateria.");
        }
      },
      "entrar": async () => {return "Garagem"},
      "voltar": async () => {
      if (ESTADO.pegarBateria === true) {
        console.log("Você tenta voltar para o corredor, mas a criatura já está atrás de você.");
        console.log("Você precisa encontar outra saida para escapar!");
      } else {
        console.log("Você volta para o corredor.");
        return "Corredor";
    }
    },
  },
},
  Garagem: {
    descricao: () => {
      console.log(chalk.green("A garagem está trancada por dentro."));
      console.log(chalk.cyan("Um carro velho está parado no centro."));
      console.log(chalk.gray("Talvez ainda funcione."));
      console.log(chalk.gray("Mas parece faltar alguma coisa."));
    },
    conexoes: {
      "voltar": async () => {
        if (ESTADO.pegarBateria === true) {
          console.log("Você tenta voltar para a oficina, mas a criatura já está atrás de você.");
        } else {
          console.log("Você volta para a oficina.");
          return "Oficina";
        }
      },
      "colocar": async () => {
        if (!ESTADO.garagemAberta) {
          console.log("A porta da garagem ainda está fechada.");
          console.log("Como você vai escapar se nem consegue sair da garagem?");
        } else if (ESTADO.pegarBateria === false) {
          console.log("Você não tem uma bateria para colocar no carro.");
        } else {
          console.log("Você coloca a bateria. O motor ronca.");
          console.log(
            "Você entra no carro e dirige para longe da casa maldita.",
          );
          console.log("Parabéns, você escapou!");
          process.exit(0);
        }
      },
      "abrir": async () => {
        if (ESTADO.pegarChave === true) {
          ESTADO.garagemAberta = true;
          console.log("Você usa a chave e abre a porta da garagem.");
          console.log("O ar fresco entra.");
          console.log("Você pode sentir a liberdade ao seu alcance, mas o caminho ainda é perigoso.");
        } else {
          await ExecutarMonstro();
          console.log("A porta está trancada. Você não tem uma chave.");
          console.log("O monstro te alcança antes que você possa tentar outra coisa.");
          console.log(chalk.red("Você perdeu!"));
          process.exit();
        }
      },
    },
  },
};