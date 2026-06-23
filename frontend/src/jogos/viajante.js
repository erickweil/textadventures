import chalk from "chalk";
import { console, prompt, process, rl } from "../mockConsole";

// Estado centralizado
function estadoInicial() {
  return {
    nome: "",
    primeiraVez: true,
    retornandoComMecanico: false,
    mecanicoCiente: false,
    diagnosticoCiente: false,
    motorInspecionado: false,
    diagnostico: { combustivel: false, motor: false, cambio: false, carda: false },
    conserto: { finalizado: false },
    jornada: { foiAoPosto: false, horaTardia: false },
  };
}

// Utilidades
function diagnosticosFeitos(state) {
  return Object.values(state.diagnostico).filter(Boolean).length;
}

function todosOsDiagnosticos(state) {
  return diagnosticosFeitos(state) === 4;
}

// Cenários
const cenarios = {

  menu: {
    descricao: async () => {
      console.log(
        "Seja bem-vindo ao jogo " + chalk.bold("O Tempo do Viajante") + "! ⏱️\n" +
        "Bora jogar!"
      );
    },
    conexoes: () => ({
      "jogar": () => { console.clear(); return "scania"; },
      "criadores": () => { console.clear(); return "creditos"; },
    }),
  },

  creditos: {
    descricao: async () => {
      console.log("Criado com esforço por Gabriela e Leonardo. 🚛");
    },
    conexoes: () => ({
      "voltar": () => { console.clear(); return "menu"; },
    }),
  },

  // Caminhão
  scania: {
    descricao: async (state) => {
      if (state.primeiraVez) {
        console.log(
          chalk.italic("*Este jogo se trata de um caminhoneiro que realiza uma entrega de produtos,\n" +
            "mas quando menos se espera...*\n") +
          "\nVish! Calculei errado a próxima parada — devia ter parado no último posto!\n" +
          chalk.italic("*Seu caminhão parou no meio da estrada. O silêncio do motor pesa.*")
        );
        state.primeiraVez = false;
      } else if (state.retornandoComMecanico) {
        console.log(chalk.italic("*Vocês retornaram ao caminhão.*"));
        console.log(
          "Certo, " + chalk.bold(state.nome) + "! Parece solúvel, sem necessidade de voltar à mecânica.\n" +
          "Vou iniciar o diagnóstico — fique por perto para acompanhar."
        );
        state.retornandoComMecanico = false;
        state.diagnosticoCiente = true;
      }
    },
    conexoes: (state) => {
      const ops = {
        "ver a hora": () => {
          console.clear();
          if (!state.jornada.horaTardia) {
            console.log(chalk.italic("*1:03 PM — um dia normal de trabalho.*"));
          } else {
            console.log(chalk.italic("*5:15 PM — a luz da tarde começa a dourar a estrada.*"));
          }
          return "scania";
        },
        "sair do veiculo": () => {
          console.clear();
          console.log("Você desce do veículo. O asfalto quente irradia sob seus pés.");
          return "fora";
        },
      };

      if (state.conserto.finalizado) {
        ops["dirigir"] = () => {
          console.clear();
          console.log(
            chalk.green("\n🏁 Parabéns, viajante! A estrada é sua novamente.\n") +
            chalk.italic("*Motor ronca, marcha engatada, horizonte à frente.*\n")
          );
          Object.assign(state, estadoInicial());
          return "menu";
        };
      }

      return ops;
    },
  },

  // Fora do caminhão
  fora: {
    descricao: async (state) => {
      if (!state.jornada.foiAoPosto) {
        console.log(chalk.italic("*O motor está parado e há uma mancha de óleo no asfalto. Preciso de ajuda.*"));
      } else if (state.conserto.finalizado) {
        console.log(chalk.italic("*Tudo consertado. Hora de voltar para a estrada.*"));
      } else {
        console.log(chalk.italic("*O mecânico está trabalhando no motor. O cheiro de graxa no ar.*"));
      }
    },
    conexoes: (state) => {
      const ops = {
        "N": () => { console.clear(); return "outroLadoEstrada"; },
        "L": () => { console.clear(); return "frenteEstrada"; },
        "entrar no veiculo": () => {
          console.clear();
          console.log(chalk.italic("*Você entra no caminhão.*"));
          return "scania";
        },
      };

      if (!state.jornada.foiAoPosto && !state.diagnostico.motor) {
        ops["inspecionar o motor (por fora)"] = () => {
          console.clear();
          console.log(
            "Você abre o capô e sente o cheiro de óleo queimado.\n" +
            chalk.yellow("⚠ Mancha escura nos pistões. Velas com desgaste visível. Algo está carbonizado lá dentro.\n") +
            chalk.italic("*Você anota mentalmente: o problema é no motor.*")
          );
          state.motorInspecionado = true;
          return "fora";
        };
      }

      if (!state.jornada.foiAoPosto) {
        ops["O (ir ao posto)"] = () => { console.clear(); return "posto"; };
      }

      if (state.diagnosticoCiente) {
        ops["diagnostico"] = () => { console.clear(); return "diagnostico"; };
      }

      return ops;
    },
  },

  // Diagnóstico
  diagnostico: {
    descricao: async () => {
      console.log("Escolha o que inspecionar:");
    },
    conexoes: (state) => {
      const ops = {};

      if (!state.diagnostico.combustivel) {
        ops["checar o combustivel"] = () => {
          console.clear();
          state.diagnostico.combustivel = true;
          console.log("Combustível ok — nível dentro do esperado, sem impurezas.");
          return todosOsDiagnosticos(state) ? "fix" : "diagnostico";
        };
      }
      if (!state.diagnostico.motor) {
        ops["verificar o motor"] = () => {
          console.clear();
          state.diagnostico.motor = true;
          if (state.motorInspecionado) {
            console.log(
              "Motor — exatamente o que você já suspeitava: " +
              "velas desgastadas e carbonização nos pistões causando o vazamento de óleo.\n" +
              chalk.italic("*(Sua inspeção anterior foi certeira.)*")
            );
          } else {
            console.log(
              "Motor — velas desgastadas e carbonização nos pistões.\n" +
              "Isso explica o vazamento de óleo."
            );
          }
          return todosOsDiagnosticos(state) ? "fix" : "diagnostico";
        };
      }
      if (!state.diagnostico.cambio) {
        ops["checar a caixa de cambio"] = () => {
          console.clear();
          state.diagnostico.cambio = true;
          console.log("Câmbio ok — trocas suaves, sem ruídos ou vazamentos.");
          return todosOsDiagnosticos(state) ? "fix" : "diagnostico";
        };
      }
      if (!state.diagnostico.carda) {
        ops["checar o carda"] = () => {
          console.clear();
          state.diagnostico.carda = true;
          console.log("Cardã ok — sem folgas nas juntas, funcionamento estável.");
          return todosOsDiagnosticos(state) ? "fix" : "diagnostico";
        };
      }

      return ops;
    },
  },

  // Proposta de conserto
  fix: {
    descricao: async (state) => {
      console.log(
        "Diagnóstico completo. O problema é no motor:\n\n" +
        "  • Substituir as velas de ignição\n" +
        "  • Limpar a carbonização nos pistões\n" +
        "  • Trocar as juntas para conter o vazamento de óleo\n\n" +
        (state.motorInspecionado
          ? chalk.italic("*(Você reconhece tudo isso — já tinha visto lá fora.)*\n")
          : "") +
        "Posso resolver agora mesmo. Vamos?"
      );
    },
    conexoes: (state) => ({
      "ok, pode resolver": () => {
        console.clear();
        console.log(chalk.italic("*O mecânico trabalha por cerca de 40 minutos. O motor volta a roncar.*"));
        state.conserto.finalizado = true;
        return "finalizado";
      },
    }),
  },

  // Cena final do conserto
  finalizado: {
    descricao: async () => {
      console.log("Pronto! Motor de volta à vida. 🔧");
    },
    conexoes: (state) => ({
      "muito obrigado, mao de broca": () => {
        console.clear();
        console.log(
          "De nada, " + chalk.bold(state.nome) + "! 🤠\n\n" +
          chalk.italic(
            '"Lembre-se: o motor clama por reparos antes que o tempo\n' +
            'o condene à ferrugem eterna. Boa estrada, viajante!"\n'
          )
        );
        return "fora";
      },
    }),
  },

  // Lados da estrada
  frenteEstrada: {
    descricao: async () => {
      console.log(
        "O asfalto se estende até onde a vista alcança.\n" +
        chalk.italic("*É o horizonte que eu preciso cruzar — assim que o caminhão voltar a funcionar.*")
      );
    },
    conexoes: () => ({
      "O (voltar ao caminhao)": () => {
        console.clear();
        console.log("O caminhão está parado na beira da estrada, mancha de óleo no asfalto.");
        return "fora";
      },
    }),
  },

  outroLadoEstrada: {
    descricao: async () => {
      console.log("Só mato e poeira pelo outro lado da estrada. Nada útil aqui.");
    },
    conexoes: () => ({
      "S (voltar ao caminhao)": () => {
        console.clear();
        console.log("O caminhão está parado na beira da estrada, mancha de óleo no asfalto.");
        return "fora";
      },
    }),
  },

  // Posto de gasolina
  posto: {
    descricao: async (state) => {
      if (!state.jornada.foiAoPosto) {
        console.log(
          "Com determinação, você decide voltar ao posto a pé.\n\n" +
          chalk.italic(
            "*A estrada é longa e o sol castiga. Duas horas caminhando você para\n" +
            "para beber água num riacho. Mais duas horas e o letreiro do posto\n" +
            "aparece no horizonte — a melhor vista do dia.*\n"
          )
        );
        state.jornada.foiAoPosto = true;
      } else {
        console.log("Você está no posto. O ar cheira a combustível e concreto quente.");
      }
    },
    conexoes: () => ({
      "falar com o frentista": () => {
        console.clear();
        return "frentista";
      },
    }),
  },

  // Frentista
  frentista: {
    descricao: async () => {
      console.log("Olá! Sou o Elias. Chegou a pé? Cara, que disposição! 😅 Como posso ajudar?");
    },
    conexoes: () => ({
      "meu caminhao quebrou na estrada": () => {
        console.clear();
        console.log(
          "Puts, que azar! Mas pode se acalmar — " +
          "temos o Mão de Broca aqui do lado.\n" +
          "Ele é o melhor mecânico da região e tem guincho. Fala com ele! 🤠"
        );
        return "continuar";
      },
      "sair": () => {
        console.clear();
        console.log("Tenha uma boa viagem, viajante! 😃");
        return "posto";
      },
    }),
  },

  continuar: {
    descricao: async () => {
      console.log("A mecânica é aqui do lado. Dá uma olhada lá! 🔧");
    },
    conexoes: () => ({
      "ir para a mecanica": () => {
        console.clear();
        return "mecanica";
      },
    }),
  },

  // Mecânico
  mecanica: {
    descricao: async (state) => {
      console.log(chalk.italic("*Você encontrou o Mão de Broca na mecânica.*"));

      if (!state.mecanicoCiente) {
        console.log("Olá viajante! Qual é o seu nome?");
        const nomeDigitado = await prompt(">");
        state.nome = nomeDigitado || "Viajante";
        console.clear();

        if (state.motorInspecionado) {
          console.log(
            "Prazer, " + chalk.bold(state.nome) + "! Seu caminhão tá longe?\n" +
            chalk.italic("*(Você menciona que já inspecionou o motor e viu carbonização nos pistões.)*\n") +
            "Hmm... velas e pistões. Já sei o que é. Tenho tudo no guincho. Vamos nessa!"
          );
        } else {
          console.log(
            "Prazer, " + chalk.bold(state.nome) + "! Tá na estrada? Sem problema — " +
            "pego o guincho e a gente resolve."
          );
        }
        state.mecanicoCiente = true;
      } else {
        console.log("Fala, " + chalk.bold(state.nome) + "! Pronto para voltar ao caminhão?");
      }
    },
    conexoes: (state) => ({
      "voltar ao caminhao com o guincho": () => {
        console.clear();
        console.log(
          chalk.italic(
            "*12 minutos pela estrada no guincho. O caminhão aparece no horizonte —\n" +
            "menor do que parecia quando você estava preso nele.*"
          )
        );
        state.retornandoComMecanico = true;
        state.jornada.horaTardia = true;
        return "scania";
      },
      "sair": () => {
        console.clear();
        console.log("Boa viagem, " + chalk.bold(state.nome) + "!");
        return "posto";
      },
    }),
  },
};

// Loop principal
export async function viajante() {
  let state = estadoInicial();
  let cenarioAtual = cenarios["menu"];
  console.clear();

  while (true) {
    await cenarioAtual.descricao(state);

    const comandosDisponiveis = cenarioAtual.conexoes(state);

    for (const chave in comandosDisponiveis) {
      console.log("-", chave);
    }

    const comando = await prompt(">");
    if (!comando) return;

    const acao = comandosDisponiveis[comando];
    if (acao) {
      const destino = acao();
      cenarioAtual = cenarios[destino];
    } else {
      console.clear();
      console.log(chalk.red("Comando inválido no seu contexto!"));
    }
  }
}