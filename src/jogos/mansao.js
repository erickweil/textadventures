//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function mansao() {

async function mostrarComPausa(texto) {
  const linhas = texto.split("\n");
  for (const linha of linhas) {
    await prompt("");
    console.log(linha);
  }
}

const inventario = {
  Convite: "Seu convite para a festa...",
  Identidade: "Sua identidade...",
  "Chaves de casa": "Um molho de chaves...",
};

let petiscos = 0;
let luzesLigadas = false;
let salaAtual = "PortaEntrada"; // primeira sala do jogo

const salas = {
  PortaEntrada: {
    descricao: () => "Você foi convidado para uma festa nos fundos de uma mansão...\nI: Entrar\nB: Ver inventário",
    interacoes: {
      I: () => (salaAtual = "HallEscuro"),
    },
    comandos: {
      B: "inventario",
    },
  },

  HallEscuro: {
    descricao: () =>
      luzesLigadas
        ? `"Onde que leva para os fundos?"\nW: Escada\nA: Sala de jantar\nS: Voltar à entrada\nD: Sala de estar\nI: Interagir\nB: Inventário`
        : "Um grande hall de entrada, entretanto tudo está escuro.\nI: Ligar as luzes\nB: Inventário",
    interacoes: {
      I: () => {
        if (!luzesLigadas) {
          luzesLigadas = true;
          console.log("Você liga as luzes.");
        } else {
          console.log("As luzes já estão ligadas.");
        }
      },
    },
    comandos: {
      W: () => (salaAtual = "Escada"),
      A: () => (salaAtual = "SalaJantar"),
      S: () => (salaAtual = "PortaEntrada"),
      D: () => (salaAtual = "SalaEstar"),
      B: "inventario",
    },
  },

  Escada: {
    descricao: () => `Você está diante da escada.\nI: Subir \nE: Porta Minimalista\nA: Sala de jantar\nS: Hall\nD: Sala de estar`,
    interacoes: {
      I: () => console.log("Não acho que há algo a ser explorado lá."),
    },
    comandos: {
      E: () => (salaAtual = "PortaMinimalista"),
      A: () => (salaAtual = "SalaJantar"),
      S: () => (salaAtual = "HallEscuro"),
      D: () => (salaAtual = "SalaEstar"),
      B: "inventario",
    },
  },

  PortaMinimalista: {
    descricao: () => {
      if (inventario["Mapa estranho"]) {
        return `\"Que estranho! Uma porta antiga...\"\nI: Tocar\nQ: Escada\nB: Inventário`;
      } else {
        return "Uma porta quase invisível\nI: Tentar abrir\nS: Voltar";
      }
    },
    interacoes: {
  I: () => {
    if (inventario["Mapa estranho"]) {
      console.log("O papel amassado voa até a parede... A porta gira, e você cai no vazio!");
      console.log("...");
      console.log("Sua visão escurece. Você acorda em um lugar diferente.");
      salaAtual = "MundoFragmentado";
    } else if (inventario["Molho de chaves"]) {
      console.log("Você insere uma das chaves no formato da fechadura... Ela gira com um clique suave.");
      console.log("A parede se abre silenciosamente, revelando uma luz suave além dela.");
      console.log("Você atravessa a abertura com passos decididos, como se estivesse encerrando um ciclo...");
      console.log("[pressione qualquer tecla]")
      salaAtual = "Fundos";
    } else {
      console.log("A parede parece se mover, mas nada acontece.\nÉ possível ver o formato de uma fechadura.");
    }
  },
},
    comandos: {
      S: () => (salaAtual = "HallEscuro"),
      B: "inventario",
    },
  },

  SalaJantar: {
    descricao: () => `Ambiente bem iluminado com uma mesa e petiscos\nW: Cozinha\nA: Bancada\nD: Hall\nB: Inventário`,
    comandos: {
      W: () => (salaAtual = "PortaCozinha"),
      A: () => (salaAtual = "BancadaPetiscos"),
      D: () => (salaAtual = "HallEscuro"),
      B: "inventario",
    },
  },

  BancadaPetiscos: {
    descricao: () => "O aroma é delicioso. I: Pegar petisco\nW: Cozinha\nD: Voltar\nB: Inventário",
    interacoes: {
      I: () => {
        if (petiscos < 3) {
          petiscos++;
          console.log(`Você pegou ${petiscos} petisco`);
          if (!inventario["Chave cozinha"]) {
            inventario["Chave cozinha"] = "Chave da cozinha obtida na bancada.";
            console.log("Você encontrou uma chave na bancada!");
          }
        } else {
          console.log("Você já pegou petiscos suficientes.");
        }
      },
    },
    comandos: {
      W: () => (salaAtual = "PortaCozinha"),
      D: () => (salaAtual = "SalaJantar"),
      B: "inventario",
    },
  },

  PortaCozinha: {
    descricao: () =>
      inventario["Chave cozinha"]
        ? "Porta da cozinha destrancada.\nI: Entrar\nA: Bancada\nD: Voltar\nB: Inventário"
        : "A porta está trancada.\nA: Bancada\nD: Voltar\nB: Inventário",
    interacoes: {
      I: () => {
        if (inventario["Chave cozinha"]) {
          salaAtual = "Cozinha";
        } else {
          console.log("A porta está trancada.");
        }
      },
    },
    comandos: {
      A: () => (salaAtual = "BancadaPetiscos"),
      D: () => (salaAtual = "SalaJantar"),
      B: "inventario",
    },
  },

  Cozinha: {
    descricao: () => "Uma cozinha ampla e limpa\nS: Voltar\nD: Ir ao lavabo\nB: Inventário",
    comandos: {
      S: () => (salaAtual = "PortaCozinha"),
      D: () => (salaAtual = "Lavabo"),
      B: "inventario",
    },
  },

  Lavabo: {
    descricao: () => "Ambiente cheiroso com espelho e sanitário\nA: Voltar\nS: Usar sanitário\nD: Olhar no espelho\nB: Inventário",
    comandos: {
      A: () => (salaAtual = "Cozinha"),
      S: () => console.log("Você usou o sanitário. Lave as mãos depois."),
      D: () => console.log("\“Melhor que isso só nascendo de novo.\”"),
      B: "inventario",
    },
  },

  SalaEstar: {
    descricao: () => "Sala aconchegante com TV e mesinha\nW: TV\nA: Hall\nB: Inventário",
    comandos: {
      W: () => (salaAtual = "RackTV"),
      A: () => (salaAtual = "HallEscuro"),
      B: "inventario",
    },
  },

  RackTV: {
    descricao: () => "TV de última geração e algumas gavetas\nI: Vasculhar\nE: Mesinha\nA: Voltar\nB: Inventário",
    interacoes: {
      I: () => {
        if (!inventario["Mapa estranho"]) {
          console.log("Você encontrou: um carregador\n\tLivro \"Bob goods + canetinhas\"\n\tum Papel amassado.");
          inventario["Mapa estranho"] = "Um mapa estranho desenhado em papel amassado.";
          inventario["Carregador"] = "Um carregador com um lado raspado.";
          inventario["Bob Goods + Canetinhas"] = "Livro de desenho.";
        } else {
        console.log("Você já pegou os itens dessa gaveta.");
      }
    },
  },
    comandos: {
      E: () => {
        if (!inventario["Molho de chaves"]) {
          inventario["Molho de chaves"] = "Um molho de chaves.";
          console.log("Você pegou um molho de chaves.");
        } else {
          console.log("Não há mais nada aqui.");
      }
    },
      A: () => (salaAtual = "SalaEstar"),
      B: "inventario",
    },
  },

  MundoFragmentado: {
    descricao: () =>"Você está em um mundo distorcido. Tudo parece... diferente.\nW: Avançar para as ruínas\nB: Inventário",
    comandos: {
      W: () => (salaAtual = "RuinasAntigas"),
      B: "inventario",
    },
  },

  RuinasAntigas: {
    descricao: () =>
      `Entre pedras antigas, uma inscrição: "Você era o Guardião do Portão...\nW: Avançar ruínas"\nI: Recordar`,
    interacoes:{
      I: () => {
        if (!inventario["Habilidade: Barreira Temporal"]) {
          inventario["Habilidade: Barreira Temporal"] =
            "Cria um escudo que reduz dano por 2 turnos.";
          console.log("Memória recuperada: Barreira Temporal!");
        } else {
          console.log("Você já se lembra disso.");
        }
      }
    },
    comandos: {
      W: ()=> (salaAtual = "Ruina01"),
      B: "inventario",
    },
  },
  Ruina01: {
  descricao: () => "Você adentra a ruina em busca de entender melhor sobre tudo isso\nW: Avançar\nS: Voltar",
  visitado: false,
  comandos:{
    W: ()=> (salaAtual = "Parede"),
    S: ()=> (salaAtual = "RuinasAntigas"),
    B: "inventario"
  },
  inimigo: {
    nome: "Guardião das Ruínas",
    hp: 20
  }
  },
  Parede: {
    descricao: () => "Você se sente desnorteado, parece uma caminhada interminável, ainda mais depois de uma criatura estranha aparecer e te atacar derepente\nParece que finalmente chegou em algum fim, após inúmeros escombros de ruínas, algo diferente pode ser visto\nUma parede muito estranha, não parece pertencente à esse lugar\nÉ de alguma forma familiar\nI: Entrar",
    interacoes:{
    I: ()=> (salaAtual = "Casa")
    
  },
  hpJogador : 50,
  inimigo: {
    nome: "Sombras Ambulante",
    hp: 20
  },
    inimigo: {
    nome: "Sombras Ambulante",
    hp: 20
  }
  },
  Casa: {
    descricao: () => "Você acorda no chão frio de uma casa silenciosa. A luz do lado de fora atravessa pequenas frestas, mas não revela muito.\n" +
    "Os móveis são familiares… muito familiares. Uma sensação desconfortável de déjà vu toma conta de você.\n" +
    "Há uma cozinha à frente, um quarto à esquerda e um banheiro à direita.\n" +
    "W: Cozinha | A: Quarto | D: Banheiro | B: Inventário",
    comandos: {
      W: ()=> (salaAtual = "CozinhaNova"),
      A: ()=> (salaAtual = "QuartoNovo"),
      D: ()=> (salaAtual = "BanheiroNovo"),
      B: "inventario",
    } 
  },
  CozinhaNova: {
  descricao: () => "Você entra na cozinha. O cheiro é estranho… como se alguém tivesse acabado de sair dali.\n" +
    "Utensílios estão perfeitamente alinhados, mas há uma xícara sobre a pia, ainda úmida.\n" +
    "Tudo parece ter parado no tempo, como se o espaço aguardasse sua chegada.\n" +
    "S: Voltar | B: Inventário",
  comandos: {
    S: () => (salaAtual = "Casa"),
    B: "inventario",
  }
},
QuartoNovo: {
  descricao: () =>
    "O quarto está mergulhado numa penumbra reconfortante. As paredes têm marcas… como rabiscos de infância.\n" +
    "Em cima da cama há um velho diário com seu nome na capa — mas ele está trancado.\n" +
    "Você sente como se já tivesse dormido aqui incontáveis vezes.\n" +
    "D: Voltar | B: Inventário",
  comandos: {
    D: () => (salaAtual = "Casa"),
    B: "inventario",
  }
},
BanheiroNovo: {
  descricao: () =>
    "Um espelho embaçado domina a parede do banheiro. Quando você se aproxima, ele limpa sozinho.\n" +
    "Por um breve momento, seu reflexo parece não acompanhar seus movimentos.\n" +
    "O som de água pingando ecoa alto demais para ser natural.\n" +
    "A: Voltar | B: Inventário",
  comandos: {
    A: () => (salaAtual = "Casa"),
    B: "inventario",
  }
},
  SalaRevelada: {
  descricao: async () => {
    console.log("[pressione qualquer tecla]");
    await mostrarComPausa(
      "A escuridão envolve tudo... e então você lembra.\n" +
      "Você era um fugitivo. Mas não de algo externo...\n" +
      "Você fugia de si mesmo. Da realidade que criou. Dos compromissos que ignorou.\n\n" +
      "Para escapar, você moldou este mundo. Um labirinto de ilusões, repleto de criaturas e portas — cada uma um reflexo da sua tentativa desesperada de fugir.\n" +
      "Mas agora, a ilusão começa a ruir. Tudo respira ao seu redor, como se o mundo que você criou também desejasse que tudo terminasse.\n\n" +
      "Uma voz sussurra nas paredes, com o tom exato da sua própria mente:\n" +
      "\nNão acha que já fugiu demais das suas obrigações?\n" +
      "\“Ⲛⲁ̃ⲟ ⲁⲥⲏⲁ 𝓺𐌵ⲉ 𝓳ⲁ́ 𝓯𐌵𝓰ⲓ𐌵 ⲇⲉⲙⲁⲓ𝛓 ⲇⲁ𝛓 𝛓𐌵ⲁ𝛓 ⲟⲃꞅⲓ𝓰ⲁⲥ̧ⲟ̃ⲉ𝛓?\”\n\n" +
      "\"N̵̻̪̈́͌̕ã̵͇̙͆̈́͐͜o̴͓̦̠͋͝ a̵͇͉̪͆̾̾c̴̘̻͊̓̒͜h̸͕͖͒̈́͘a̴͓͔̺̒̒͝ q̸̡͙̘̓́̾u̴͖͙͎̐̕͠ë̸̢̠̫́͊͘ j̴͔̪̠̓͊͠á̵̪̙͕͒̽͝ f̴̢͖͌̽̒͜u̸͔̞͆̿̕ǵ̸͉͎͖͋́i̵͍̘͓̐̽̚u̴̼͓͓̓͊͝ d̵͎͍͕͑̈́͘e̵͎͓̠̓̒̚m̴̪͚̙̓͌͛a̸̠̫̞̔̒͘i̸̫͇̞͑̈́̓s̴̘͙̔̽͛ d̵͙̝͌̿̐͜a̸͇͚͆́̈́͜s̴̙͉͕̿̕̕ s̴̼̼̽̐͝u̴̢̦̼̒̈́͘a̴̻͎͎̽̐͊s̸͇͎͔͝͠͝ o̴̙̻͇͑͊̈́b̴̝̺͎̒͆͝r̸̞͙͇̀͐̔i̸̢̻̘͛̐͠g̵̻͓̔̽͝a̴͉̪͆̿̈́͜ç̵͕̼͒͑͝ṏ̴͖̘̘́̐̓e̸͎̘͛̚̕ś̸͍̼̐͝?̴̙̼̠͌͝\"\n\n" +
      "\“Você está recebendo mais uma chance... de novo.\”\n\n" +
      "Seguir\n" +
      "Fugir:"
    );
    return "";
  },
  comandos: {
    SEGUIR: () => {
      console.log("\ Você decide encarar. O mundo treme... e você desperta de volta na entrada.\n");
      salaAtual = "PortaEntrada";
    },
    FUGIR: async () => {  await mostrarComPausa(
      "\nVocê escolheu fugir... outra vez.\n"+
      "O mundo colapsa ao seu redor. Tudo vira névoa. E, por algum motivo, parece que você já passou por isso antes."+
      "\nAgradecimentos:\nCriado por você mesmo. Por suas ideias. Suas dúvidas. E seu medo.");
      process.exit();
    },
    B: "inventario"
  }
},
Fundos: {
  descricao: async () => { await mostrarComPausa(
      "Você finalmente chegou aos fundos da mansão...\n" +
      "Luzes suaves piscam ao longe, vozes familiares ecoam.\n" +
      "O som de risadas, música e alegria preenche o ar.\n\n" +
      "Você foi esperado.\n" +
      "Aqui, não há mais fuga. Só presença. Só agora.\n\n" +
      "Aproveite a festa... por enquanto."
    );
    process.exit(); // encerra o jogo com o final bom
  },
  comandos: {}
}


};

async function mostrarInventario() {
  const itens = Object.keys(inventario);

  if (itens.length === 0) {
    console.log("Seu inventário está vazio.");
    return;
  }

  console.log("🧳 Inventário:");
  itens.forEach((item, index) => {
    console.log(`[${index + 1}] - ${item}`);
  });

  const escolha = await prompt("Digite o número do item para examinar ou pressione Enter para voltar:\n> ");

  if (escolha === "") return;

  const index = parseInt(escolha) - 1;

  if (isNaN(index) || index < 0 || index >= itens.length) {
    console.log("❌ Escolha inválida.");
    return;
  }

  const itemSelecionado = itens[index];
  console.log(`🔍 ${itemSelecionado}: ${inventario[itemSelecionado]}`);
}

async function combate(inimigo) {
  let hpJogador = 30;
  let hpInimigo = inimigo.hp;

  console.log(`Combate iniciado contra ${inimigo.nome}!`);

  while (hpJogador > 0 && hpInimigo > 0) {
    console.log(`Você: ${hpJogador} HP | ${inimigo.nome}: ${hpInimigo} HP`);
    console.log("A: Atacar | D: Defender | B: Ver habilidades");
    const acao = (await prompt(">")).toLowerCase();

    if (acao === "a") {
      const dano = inventario["Habilidade: Golpe Etéreo"] ? 10 : 5;
      console.log(`Você ataca e causa ${dano} de dano.`);
      hpInimigo -= dano;
    } else if (acao === "d") {
      console.log("Você se defende e reduz o próximo dano.");
    } else if (acao === "b") {
      await mostrarInventario();
      continue;
    } else {
      console.log("Comando inválido.");
      continue;
    }

    if (hpInimigo > 0) {
      const dano = Math.floor(Math.random() * 8) + 3;
      console.log(`${inimigo.nome} ataca e causa ${dano} de dano.`);
      hpJogador -= dano;
    }
  }

  if (hpJogador <= 0) {
    console.log("Você foi derrotado...");
    process.exit();
  } else {
    console.log(`Você derrotou ${inimigo.nome}!`);
  }
}
const visitados = {
  CozinhaNova: false,
  QuartoNovo: false,
  BanheiroNovo: false,
};

// LOOP PRINCIPAL
while (true) {
  console.log("\n", await salas[salaAtual].descricao());

  const comando = (await prompt(">")).toUpperCase();

  if (salas[salaAtual].interacoes?.[comando]) {
    salas[salaAtual].interacoes[comando]();
  } else if (salas[salaAtual].comandos?.[comando]) {
    const destino = salas[salaAtual].comandos[comando];
    if (typeof destino === "function") {
      destino();
    } else if (destino === "inventario") {
      await mostrarInventario();
    }
  } else {
    console.log("X Comando inválido.");
  }

  if (!salas[salaAtual].visitado) {
    salas[salaAtual].visitado = true;

    if (salaAtual === "Ruina01") {
      console.log(
        "Você decide adentrar ainda mais as ruínas, sente como se algo te chamasse\n\n" +
        "\"Que sensação é essa?\" — você diz, sentindo um calafrio súbito.\n" +
        "Você se vira como se um reflexo o alertasse... Uma criatura feita de pedras flutuantes surge para atacá-lo!\n\n\n"
      );
    }

    if (salas[salaAtual].inimigo) {
      await combate(salas[salaAtual].inimigo);
    }
  }
  if (visitados.hasOwnProperty(salaAtual)) {
    visitados[salaAtual] = true;
  }

  const todosVisitados = Object.values(visitados).every(v => v);
  if (todosVisitados && !salas.Casa.revelado) {
    salas.Casa.descricao = () =>
      "Você retorna à sala central...\n" +
      "E então percebe: esta não é apenas uma casa. É uma reconstrução das suas memórias.\n" +
      "A luz muda, e uma nova porta surge lentamente no fundo da sala, feita de algo que pulsa como carne e madeira, se fazendo e desfazendo lentamente.\n" +
      "I: Entrar na porta revelada | B: Inventário";

    salas.Casa.comandos.I = () => {
      salaAtual = "SalaRevelada";
    };

    salas.Casa.revelado = true;

    console.log("\n💡 Algo mudou... Uma nova porta foi revelada na sala principal.");
  }
}

}