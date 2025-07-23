//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function sonhos() {

const SALA_INICIAL = "Floresta";

const salas = {
  Floresta: {
    descricao:
      "Você acordou em uma floresta nebulosa e sombria e encontra uma estrada que leva mais a fundo na mata.",
    conexoes: {
      N: "Estrada",
    },
    luz: false,
  },
  Estrada: {
    descricao:
      "A uma encruzilhada na estrada. Você pode seguir para o norte, leste ou oeste.",
    conexoes: {
      N: "Estrada_Norte",
      L: "Estrada_Leste",
      O: "Estrada_Oeste",
    },
    luz: false,
  },
  Estrada_Oeste: {
    descricao:
      "Você segue para o oeste e a neblina fica mais densa. Há um brilho tênue à distância, mas talvez seja perigoso.",
    conexoes: {
      Voltar: "Estrada",
    },
    luz: false,
  },
  Estrada_Norte: {
    descricao:
      "Você seguiu para o norte e encontrou uma hydra gigante bloqueando o caminho.",
    conexoes: {
      Voltar: "Estrada",
      Enfrentar: "Hydra",
    },
    luz: true,
  },

  Estrada_Leste: {
    descricao:
      "Você seguiu para o leste e encontrou uma estrada que leva a um lago misterioso.",
    conexoes: {
      Caminhar: "Lago",
      Voltar: "Estrada",
    },
    luz: true,
  },
  Lago: {
    descricao:
      "Você chegou a um lago misterioso, onde a água brilha com uma luz estranha. Há um barco no lago.",
    conexoes: {
      Pegar: "Barco",
      Voltar: "Estrada_Leste",
    },
    luz: false,
  },
  Barco: {
    descricao:
      "Você pegou o barco e percebeu que ele está furado e começou a afundar. Olhando ao redor você vê um pote.",
    conexoes: {
      Continuar: "PERDEU",
      Usar: "BarcoSeco",
      Descartar: "PERDEU",
    },
    luz: false,
  },
  BarcoSeco: {
    descricao:
      "Você usou o pote para secar a água do barco! Agora pode continuar navegando em segurança.",
    conexoes: {
      Continuar: "Hydra",
      Voltar: "Afundou",
    },
    luz: false,
  },
  Afundou: {
    descricao: "O barco afundou e você não pode voltar.",
    conexoes: {
      Voltar: "Hydra",
    },
    luz: false,
  },

  Hydra: {
    descricao:
      "Eu sou a hydra de Lerna — Três cabeças, três enigmas. Se errar você morre. Escolha uma cabeça e responda o enigma.",
    conexoes: {
      Vornex: "PERDEU",
      Miranith: "PERDEU",
      Ithoce: "PERDEU",
      Echoith: "Echoith",
    },
    luz: true,
  },
  Hydra2: {
    descricao:
      "Eu sou a hydra de Lerna — Duas cabeças, dois enigmas. Se errar você morre. Escolha uma cabeça e responda o enigma.",
    conexoes: {
      Myrlith: "PERDEU",
      Vornox: "Vornox",
      Thiranith: "PERDEU",
    },
    luz: true,
  },
  Hydra3: {
    descricao:
      "Eu sou a hydra de Lerna — Uma cabeça, um enigma. Se errar você morre. Escolha uma cabeça e responda o enigma.",
    conexoes: {
      Miralyth: "Miralyth",
      Lythmira: "PERDEU",
    },
    luz: true,
  },
  Portal: {
    descricao: "A hydra sussurra algo e um portal se abre. Você vai entrar?",
    conexoes: {
      Entra: "Sonho",
      Voltar: "Preso",
    },
    luz: true,
  },
  Sonho: {
    descricao:
      "Você abre os olhos e vê que está deitado na sua cama. Uma voz diz: 'Estou te observando, você não pode escapar de mim'.",
    conexoes: {
      VoltarSonhar: "Floresta",
    },
    luz: false,
  },

  Preso: {
    descricao:
      "Você está preso no mundo do sonho, obrigado a vagar num mundo escuro, sendo perseguido por seus medos.",
    conexoes: {
      Caminhar: "PERDEU",
    },
    luz: false,
  },
  Echoith: {
    descricao:
      "Não tenho boca, mas sempre respondo; quanto mais você fala comigo, mais eu ecoo. Mas se você me gritar, talvez só o vazio responda. O que sou?",
    conexoes: {
      Silencio: "PERDEU",
      Memoria: "PERDEU",
      Vento: "PERDEU",
      Eco: "Hydra2",
      Reflexo: "PERDEU",
    },
    luz: true,
  },

  Vornox: {
    descricao:
      "Quanto mais você me tira, maior eu fico. E se me colocar inteiro num saco, ele ficará mais leve. Mas se tentar me pegar, jamais terá algo em mãos. O que sou?",
    conexoes: {
      Chama: "PERDEU",
      Buraco: "Hydra3",
      Sombra: "PERDEU",
      Vazio: "PERDEU",
      Fumaca: "PERDEU",
    },
    luz: true,
  },
  Miralyth: {
    descricao:
      "Posso te mostrar o futuro ou destruir o presente. Refleto tudo, mas nada retenho. Estou em todos os lugares, mas você só me vê se olhar. O que sou?",
    conexoes: {
      Espelho: "Portal",
      Imaginacao: "PERDEU",
      Agua: "PERDEU",
      Lembranca: "PERDEU",
    },
    luz: true,
  },
  PERDEU: {
    descricao: "VOCÊ MORREU!",
    conexoes: {},
    luz: true,
  },
};

Object.values(salas).forEach((sala) => {
  if (sala.luz === undefined) sala.luz = true;
});

let salaAtual = salas[SALA_INICIAL];
let lanterna = false;
let bateria = 15;

function exibirSala() {
  if (salaAtual.luz || lanterna) {
    console.log("\n" + salaAtual.descricao);
    for (const chave in salaAtual.conexoes) {
      console.log("-", chave);
    }
  } else {
    console.log("\nEstá tudo escuro...");
    console.log("Experimente ligar a lanterna (ligar)");
  }
}

while (true) {
  exibirSala();

  if (lanterna) {
    bateria--;
    if (bateria <= 0) {
      lanterna = false;
      console.log("Acabou a bateria da sua lanterna.");
    }
  }

  const comando = (await prompt(">")).trim();
  if (!comando) {
    console.log("Comando vazio. Digite algo!");
    continue;
  }

  const normalizado = comando.toLowerCase();

  if (normalizado === "ligar") {
    if (bateria > 0) {
      lanterna = true;
      console.log("Você ligou a lanterna.");
    } else {
      console.log("Você tenta ligar mas nada acontece.");
    }
    continue;
  }

  if (normalizado === "desligar") {
    lanterna = false;
    console.log("Você desligou a lanterna.");
    continue;
  }

  const destino =
    salaAtual.conexoes[comando] || salaAtual.conexoes[normalizado];
  if (destino) {
    salaAtual = salas[destino];
  } else {
    console.log("Não pode ir para lá.");
    continue;
  }

  if (salaAtual === salas.PERDEU) {
    console.log("\nVOCÊ MORREU! A aventura recomeça...\n");
    salaAtual = salas[SALA_INICIAL];
    lanterna = false;
    bateria = 15;
  }
}

}