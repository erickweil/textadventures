//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function labirinto() {

const salas = {
    Porta: {
        descricao: "Você estava andando pela rua e passou perto de um buraco e escorregou e foi parar na frente de uma casa velha e abandonada. a sua frente  porta de uma casa abandona, estremamente velha. Parece que tem uma chave em cima da mesinha ao lado, voce pensa(Deve ser a chave da porta), ao lado esquerdo da casa tem um quintal mal cuidado",
        conexoes: {
            "abrir porta": "sala",
            "quintal": "quintal",
            "voltar para a rua": "salaFinal",


        },
        item: {
            pegar: "chave",
        },
        status: true,// luz
        condicao: true,// aberto/fechado
        seuStatus: true // saude do jogador
    },
    Porta1: {
        descricao: "a sua frente  porta da casa abandona, estremamente velha",
        conexoes: {
            "abrir porta": "sala",
            "quintal": "quintal",
            "voltar para a rua": "salaFinal",


        },
        item: {
            pegar: "chave",
        },
        status: true,// luz
        condicao: true,// aberto/fechado
        seuStatus: true // saude do jogador
    },
    salaFinal: {
        descricao: "Parabéns! Voce ganhou. Você é esperto, não tem porque você entrar em uma casa abandonada, então voce voltou para a rua  ",
        status: true,
        condicao: true,
        seuStatus: true,
        fim: true // <-- final feliz!
    },
    sala: {
        descricao: "Voce entrou na sala. Parece que nao ha nada fora do comum, um sofa velho com um pano estampado  de flores por cima dele, uma mesa de centro com os pes de madeira e a tampa de vidro, parece ter uma lanterna em cima dela, e um tapete esquisito com marcas de botas suja de lama que levam ate a outra sala, mas parece que nao tem luz la, .",
        conexoes: {
            "voltar": "Porta1",
            "sala escura": "cozinha",

        },
        item: {
            pegar: "lanterna",
        },
        status: true, // luz
        condicao: false, // aberto/fechado
        seuStatus: true // saude do jogador

    },
    salaAberta: {
        descricao: "Voce entrou na sala parece bem velha com um sofa fedendo a mofo e uma mesa de de centro as paredes paredes estao desmanchando e tem uma porta a sua frente.",
        conexoes: {
            "abrir porta": "Porta1",
            "voltar": "cozinha",

        },
        item: {
            pegar: "lanterna",
        },
        status: true, // luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador

    },
    quintal: {
        descricao: "Você entrou no quintal, parece que ninguem cuida desse lugar a muito tempo, o mato esta alto e a grama seca, tem um cachorro morto no canto, pacerece ter um jardim com uma arvore velha com um balanço quebrado, parece que ninguem brinca aqui a muito tempo. A casa parece estar abandonada, mas você pode ver uma luz piscando na janela da sala.você pensa (Talvez eu possa pular a janela e entrar na sala)",
        conexoes: {
            "pular": "salaAternativa",
            "voltar": "Porta",
            "ir para o jardim": "Jardim"
        },
        item: {
            pegar: "nada aqui",
        },
        status: true,// luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador

    },
    salaAternativa: {
        descricao: "Voce pulou a janela pisou em algo pontudo e atravesou seu pe, começou a sangrar e voce GRITOU DE DOR. Voce conseguiu entrar na sala mas esta mancando e sangrando muito, se nao cuidar disso voce pode desmaiar.Voce olha em volta e ve uma mesa de centro e parece ter uma lanterna em cima dela, tem uma sala com  luz piscando as sua direita e voce ouve uma goteira vindo de la, voce pensa que pode ser a cozinha, talvez possa ter uma pano para ajudar com o sangramento.",
        conexoes: {
            "voltar": "Porta1",
            "sala escura": "cozinha",

        },
        item: {
            pegar: "lanterna",
        },
        status: true, // luz
        condicao: true, // aberto/fechado
        seuStatus: false // saude do jogador
    },
    cozinhaAlternativa: {
        descricao: "o chao sedeu e voce caiu do sotao na cozinha, quebrou sua perna na queda, e esta mancando. Voce ve uma sala na sua direita, parece ter algumas prateleiras com algumas latas antigas de comida, voce pensa qque pode ter alguma coisa para ajudar com seus ferimentos na cozinha ou nessa sala",
        conexoes: {
            "voltar": "salaAberta",
            "dispensa": "morteDispensa",

        },
        item: {
            pegar: "bandagem",
        },
        status: false, // luz
        condicao: true, // aberto/fechado
        seuStatus: false // saude do jogador
    },
    cozinha: {
        descricao: "Entrou na cozinha, ela esta muito velha, tem uma dispensa a direita.",
        conexoes: {
            "voltar": "salaAberta",
            "entrar na dispensa": "morteDispensa",

        },
        item: {
            pegar: "bandagem",
        },
        status: false, // luz
        condicao: true, // aberto/fechado
        seuStatus: false // saude do jogador
    },
    morteDispensa: {
        descricao: "entrou na dispensa, e o chao era falso, tinha um buraco de 3 mestros de pronfundidade com espinhos, você ficou agonizando ate morrer por hemoragia",
        jogo: false
    },
    Jardim: {
        descricao: "Voce entrou no jardim, parace que nao é cuidado a muito anos uma árvore antiga estende seus galhos até o telhado (parece ter uma entrado por ali). Em um dos galhos, balança lentamente um velho balanço de madeira — range sem vento, como se alguém invisível ainda brincasse ali. O mato alto cobre o jardim, sufocando qualquer vida que um dia floresceu.",
        conexoes: {
            "subir na arvore": "Arvore",
            "voltar": "Porta",
        },
        item: {
            pegar: "nada aqui",
        },
        status: true,// luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador
    },
    Arvore: {
        descricao: "Voce subiu na arvore, o galho ate o telhado parece aparentemente bem firme para chegar ate o telhado. ",
        conexoes: {
            "ir para o telhado": "telhado",
            "descer": "Jardim"
        },
        item: {
            pegar: "nada aqui",
        },
        status: true,// luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador
    },
    telhado: {
        descricao: "Quase chegando no telhado vc escuta um estralo do galho atras de voce e pula para o telhado. Com muito esforço voce consegui suibiu no telhado, ele esta cheio de lodo e parece muito escorregadia. Tem uma portinha aberta na parede do telhado ",
        conexoes: {
            "entrar na porta": "Sotao",
            "olhar em volta": "morteTelhado",


        },
        item: {
            pegar: "nada aqui",
        },
        status: true,// luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador
    },
    morteTelhado: {
        descricao: "escorregou do telhado caiu e quebrou o pescoco",
        jogo: false
    },
    Sotao: {
        descricao: "voce entrou pela portinha e ve um sotao iluminado pela abertura da porta, voce ve uma lanterna em cima de uma caixa ao lado da entrada, talvez tenha alguma coisa aqui dentro",
        conexoes: {
            "investigar": "cozinhaAlternativa",

        },
        item: {
            pegar: "lanterna",
        },
        status: true,// luz
        condicao: true, // aberto/fechado
        seuStatus: true // saude do jogador
    },
};

let backpack = {
    itens: {
        lanterna: { status: false, quant: 100 },
        chave: { status: false, quant: 100 },
        bandagem: { status: false, quant: 2 },
    }
}
let player = {
    saude: 100,
    ferido: false,
};

let salaAtual = salas["Porta"];
let jogo = true

while (jogo == true) {


    if (salaAtual.fim === true) {
        console.log(salaAtual.descricao);
        jogo = false;
        break;
    }
    if (salaAtual.jogo == false) {
        console.log("voce morreu...")
        console.log(salaAtual.descricao)
        break;

    }

    console.log("\n\n")
    console.log("Saude do Jogador:" + player.saude)
    console.log("\n")
    mostrar_mochila();
    console.log("\n")
    mostrarSala();
    console.log("\n\n")
    const comando = await prompt(">");

    saudeJogador(comando)
    usarItem(comando, jogo)
    const destino = salaAtual.conexoes[comando];
    let item = salaAtual.item.pegar;
    pegar_item(item, comando);
    let salaAnterior = salaAtual;
    mudaSala(destino);


    //condicoes para parar o jogo
    if (salaAtual !== salaAnterior) {
        // Se a nova sala está escura E a lanterna não está ativa no inventário



        if (salaAtual.status === false && backpack.itens.lanterna.status === false) {
            console.clear();
            console.log("Está muito escuro! Você tentou andar em uma sala escura sem luz, tropeçou, bateu a cabeça e morreu...");
            jogo = false; // Encerra o jogo
            continue; // Pula o resto da iteração do loop para encerrar imediatamente
        }
    }
    if (comando == "ex") {
        console.clear()
        console.log("Saindo do jogo...");
        break

    }
    if (player.saude <= 0) {
        console.clear()
        console.log("Voce morreu!, sua saude:", player.saude)

        break
    }
    
    
    console.clear()

}
function mostrar_mochila() {
    console.log("------------------")
    console.log("MOCHILA:")
    for (let chave in backpack.itens) {
        let verifica = backpack.itens[chave].status
        let nivel = backpack.itens[chave].quant
        if (verifica == true)
            console.log(chave, "status:" + nivel + "%")
    }
    console.log("------------------")
}
function pegar_item(item, comando) {
    if (comando == "pegar" + " " + item) {
        backpack.itens[item].status = true;
        salaAtual.item.pegar = "nada aqui"
    }
}
function mostrarSala() {

    if (!salaAtual.condicao) {
        console.log("Sala trancada, use uma chave");
        return;
    } else if (salaAtual.status == false) {
        console.log("esta muito escuro, use uma lanterna");
    }
    else {
        console.log(salaAtual.descricao);
        if (salaAtual.item && salaAtual.item.pegar !== "nada aqui" && !backpack.itens[salaAtual.item.pegar].status) {
            console.log(`Você vê um(a) ${salaAtual.item.pegar} aqui.`);
        }
        for (let chave in salaAtual.conexoes) {
            console.log("-", chave);
        }
    }



}
function mudaSala(destino) {
    if (destino) {
        salaAtual = salas[destino];
    }
}
function saudeJogador(comando) {

    if (comando === "pular" && salaAtual === salas["quintal"]) {
        player.saude -= 50;
        player.ferido = true;

    } if (comando === "investigar" && salaAtual === salas["Sotao"]) {
        player.saude -= 90;
        player.ferido = true;

    }

    if (player.ferido = true && player.saude < 60) {
        player.saude -= 2
    }

}
function usarItem(comando) { // Removi 'jogo' do parâmetro, pois a lógica de 'jogo = false' é tratada no loop principal
    if (comando === "usar chave" && !salaAtual.condicao) {
        if (backpack.itens.chave.status) {
            salaAtual.condicao = true;
            backpack.itens.chave.status = false; // A chave deve ser "consumida" ou removida após o uso.
            console.log("Você usou a chave e a porta foi destrancada!");
        } else {
            console.log("Você não tem a chave para usar.");
        }
    } else if (comando === "usar lanterna") {
        if (backpack.itens.lanterna.status && backpack.itens.lanterna.quant > 0) {
            salaAtual.status = true;
            backpack.itens.lanterna.quant -= 25;
            console.log(`Você usou a lanterna. Carga restante: ${backpack.itens.lanterna.quant}%`);

            if (backpack.itens.lanterna.quant <= 0) {
                backpack.itens.lanterna.status = false;
                console.log("A bateria da lanterna acabou!");
            }
            if (salaAtual.status === false && backpack.itens.lanterna.status === false && comando != "voltar") {
                console.clear();
                jogo = false;
                return console.log("Está muito escuro! Você tropeça, bate a cabeça e morre...");
            }
        } else if (!backpack.itens.lanterna.status && backpack.itens.lanterna.quant <= 0) {
            console.log("A bateria da lanterna está esgotada.");
            salaAtual.status = false; // Garante que a sala fique escura se a lanterna estiver sem carga
        } else {
            console.log("Você não tem uma lanterna, ou ela não está ativada.");
        }
    } else if (comando === "usar bandagem") {
        if (backpack.itens.bandagem.status && backpack.itens.bandagem.quant > 0) {
            player.saude += 20;
            backpack.itens.bandagem.quant -= 1;
            console.log(`Você usou uma bandagem. Sua saúde é agora: ${player.saude}. Bandagens restantes: ${backpack.itens.bandagem.quant}`);
            if (backpack.itens.bandagem.quant <= 0) {
                backpack.itens.bandagem.status = false;
                console.log("Você não tem mais bandagens.");
            }
        } else {
            console.log("Você não tem bandagens para usar.");
        }
    }
}
function fimjogo(comando) {
    if (comando === "ex") {
        let tela = console.log("Saindo do jogo...");
        jogo = false
        return tela

    }
    if (player.saude <= 0) {
        let tela = ("Voce morreu!, sua saude:", player.saude)
        jogo = false
        return tela;
    }
}
}