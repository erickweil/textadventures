import { console, prompt, process, rl } from "../mockConsole";

export async function aveltor() {
let inventario = [];
let Porta_aberta = false;

let anelEncontrado = false;
let acoesNoAcampamento = 0;
let bilheteEncontrado = false;
let caliceEncontrado = false;

const caminhoCorretoRio = ["DIREITA", "ESQUERDA", "ESQUERDA", "DIREITA"];
let passoNaTravessia = 0;

let anelNoPedestal = false;
let caliceNoPedestal = false;
let portaTemploAberta = false;
const sequenciaRunasCorreta = ["LUZ", "SOMBRA", "CAOS", "EQUILÍBRIO"];
let runasAcesas = [];
let puzzleRunasResolvido = false;
let livroLido = false;

const salas = {
    Centro: {
        descricao: () => "Você está no centro da cidade de Eldrun.",
        conexoes: { 
            "L": () => "Praça",
            "S": () => "Floresta",
            "N": () => "CasaGuardiao",
            "O": () => "Taverna"
        }
    },
    Praça: {
        descricao: () => {
            let desc = "Você está na praça principal, com uma grande fonte de pedra no meio. Há crianças a brincar e comerciantes a vender as suas mercadorias.";
            if (inventario.includes("Bilhete Amassado")) {
                desc += "\n\nAs palavras do bilhete, 'guardião de pedra', ecoam na sua mente. Você olha para a imponente fonte de uma forma completamente nova.";
            }
            return desc;
        },
        conexoes: {
            "INVESTIGAR FONTE": () => {
                if (!inventario.includes("Bilhete Amassado")) {
                    console.log("É uma fonte grande e antiga, mas não parece haver nada de especial nela.");
                } else if (caliceEncontrado) {
                    console.log("Você já investigou a fonte e encontrou tudo o que havia para encontrar.");
                } else {
                    console.log("Lembrando da pista 'onde o sol não alcança', você examina a base norte da fonte, coberta de sombra e limo.");
                    console.log("Você passa os dedos por uma fenda e sente algo embrulhado em panos velhos. Ao abri-lo, você revela um cálice antigo.");
                    caliceEncontrado = true;
                    inventario.push("Cálice Antigo");
                    console.log("--> 'Cálice Antigo' foi adicionado ao seu inventário.");
                }
                return "Praça";
            },
            "O": () => "Centro"
        }
    },
    Taverna: {
        descricao: () => "Você está na taverna 'O Javali Sedento'. O ambiente é barulhento e cheira a cerveja e guisado.",
        conexoes: { "L": () => "Centro" }
    },
    CasaGuardiao: {
        descricao: () => Porta_aberta ? "Você está na porta da casa do guardião da vila, que está aberta." : "Você está na porta da casa do guardião da vila, que está fechada.",
        conexoes: {
            "N": () => {
                if (Porta_aberta) return "SalaCasa";
                else { console.log("A porta está fechada."); return "CasaGuardiao"; }
            },
            "ABRIR": () => {
                if (Porta_aberta) console.log("A porta já está aberta.");
                else { Porta_aberta = true; console.log("Você abre a porta."); }
                return "CasaGuardiao";
            },
            "FECHAR": () => {
                if (!Porta_aberta) console.log("A porta já está fechada.");
                else { Porta_aberta = false; console.log("Você fecha a porta."); }
                return "CasaGuardiao";
            },
            "S": () => "Centro"
        }
    },
    SalaCasa: {
        descricao: () => "Você está na sala da casa do guardião. Ele acena para você de seu sofá.",
        conexoes: { "S": () => "CasaGuardiao" }
    },
    Floresta: {
        descricao: () => "Você entra numa floresta densa. Vê um caminho a Leste, uma placa para uma igreja a Oeste e ouve o som de um rio ao Sul.",
        conexoes: { 
            "L": () => "Caminho",
            "O": () => "Igreja",
            "N": () => "Centro",
            "S": () => "Rio"
        }
    },
    Caminho: {
        descricao: () => `Você encontra um acampamento de monstros recém-abandonado. Há uma fogueira fumegante e uma tenda. Você ouve barulhos na mata... deve ser rápido.`,
        conexoes: {
            "INVESTIGAR FOGUEIRA": () => { acoesNoAcampamento++; console.log("Você remexe as cinzas. Apenas ossos de pequenos animais."); if (acoesNoAcampamento >= 2) { return "Caminho_Monstros"; } return "Caminho"; },
            "OLHAR TENDA": () => { acoesNoAcampamento++; if (anelEncontrado) { console.log("Nada mais de interessante aqui."); } else { console.log("Você encontra um pequeno anel de prata!"); inventario.push("Anel de Prata"); console.log("--> 'Anel de Prata' foi adicionado ao seu inventário."); anelEncontrado = true; } if (acoesNoAcampamento >= 2) { return "Caminho_Monstros"; } return "Caminho"; },
            "O": () => "Floresta"
        }
    },
    Caminho_Monstros: {
        descricao: () => "Tarde demais! Dois Goblins saem da mata e te cercam!",
        conexoes: {
            "LUTAR": () => "Derrota",
            "FUGIR": () => {
                if (Math.random() < 0.5) { console.log("Você escapa por pouco!"); return "Floresta"; }
                else { console.log("Você tropeça e é alcançado!"); return "Derrota"; }
            }
        }
    },
    Derrota: {
        descricao: () => "Você foi derrotado. A sua aventura em Aveltor termina aqui... FIM DE JOGO.",
        conexoes: {}
    },
    Igreja: {
        descricao: () => "Você chega a uma pequena e antiga igreja de pedra. A porta está entreaberta. A partir daqui, você pode visitar várias áreas.",
        conexoes: {
            "CONFESSIONARIO": () => "Confessionario",
            "ALTAR": () => "Altar",
            "DEPOSITO": () => "Deposito",
            "PORAO": () => "Porao",
            "BIBLIOTECA": () => "Biblioteca",
            "SAIR": () => "Floresta"
        }
    },
    Confessionario: {
        descricao: () => "Um pequeno confessionário de madeira escura. O silêncio é tão profundo que você ouve a madeira ranger.",
        conexoes: {
            "PROCURAR": () => { if (bilheteEncontrado) { console.log("Você já procurou por aqui."); } else { console.log("Você nota uma tábua solta no chão e, por baixo, encontra um bilhete amassado!"); bilheteEncontrado = true; inventario.push("Bilhete Amassado"); console.log("--> 'Bilhete Amassado' foi adicionado ao seu inventário."); } return "Confessionario"; },
            "SAIR": () => "Igreja"
        }
    },
    Altar: {
        descricao: () => "O altar principal da igreja, uma estrutura de pedra ornamentada.",
        conexoes: { "SAIR": () => "Igreja" }
    },
    Deposito: {
        descricao: () => "Um depósito com cheiro a poeira e cera de vela.",
        conexoes: { "SAIR": () => "Igreja" }
    },
    Porao: {
        descricao: () => "Uma escada leva a um porão húmido e escuro. Um arrepio percorre a sua espinha.",
        conexoes: { "SAIR": () => "Igreja" }
    },
    Biblioteca: {
        descricao: () => "Uma pequena biblioteca com livros religiosos e registos antigos da vila.",
        conexoes: { "SAIR": () => "Igreja" }
    },
    Rio: {
        descricao: () => `Você está na beira de um rio de correnteza forte. Para atravessar, precisa de saltar por pedras instáveis em pares.\n\nVocê está no par de pedras ${passoNaTravessia + 1} de ${caminhoCorretoRio.length}.`,
        conexoes: {
            "ESQUERDA": () => { const escolha = "ESQUERDA"; if (escolha === caminhoCorretoRio[passoNaTravessia]) { console.log("Firme!"); passoNaTravessia++; if (passoNaTravessia >= caminhoCorretoRio.length) { passoNaTravessia = 0; return "Outra_Margem_Rio"; } return "Rio"; } else { console.log("A pedra afunda!"); passoNaTravessia = 0; return "Rio_Correnteza"; } },
            "DIREITA": () => { const escolha = "DIREITA"; if (escolha === caminhoCorretoRio[passoNaTravessia]) { console.log("Firme!"); passoNaTravessia++; if (passoNaTravessia >= caminhoCorretoRio.length) { passoNaTravessia = 0; return "Outra_Margem_Rio"; } return "Rio"; } else { console.log("A pedra afunda!"); passoNaTravessia = 0; return "Rio_Correnteza"; } },
            "N": () => "Floresta"
        }
    },
    Rio_Correnteza: {
        descricao: () => "A correnteza gelada te arrasta para longe... Horas depois, você acorda na taverna, com as roupas húmidas e uma dor de cabeça. Um estranho te encontrou na margem do rio.",
        conexoes: {
            "CONTINUAR": () => "Taverna"
        }
    },
    Outra_Margem_Rio: {
        descricao: () => "Você pisa em terra firme na outra margem do rio. Um novo caminho se abre à sua frente, levando a um templo antigo que se ergue entre as árvores.",
        conexoes: {
            "SEGUIR PARA O TEMPLO": () => "Entrada_Templo",
            "VOLTAR PELO RIO": () => "Rio"
        }
    },
    Entrada_Templo: {
        descricao: () => {
            let desc = "Você está perante a entrada de um templo antigo. Uma imponente porta de pedra bloqueia o caminho.\nDe cada lado da porta, há um pedestal de pedra.";
            if (anelNoPedestal) desc += "\nO pedestal da esquerda ostenta o Anel de Prata, que emite uma luz fraca.";
            if (caliceNoPedestal) desc += "\nO pedestal da direita contém o Cálice Antigo, que parece absorver a luz.";
            if (portaTemploAberta) desc += "\nA grande porta de pedra está aberta, revelando a escuridão.";
            return desc;
        },
        conexoes: {
            "USAR ANEL": () => {
                if (!inventario.includes("Anel de Prata")) { console.log("Você não tem este item."); return "Entrada_Templo"; }
                if (anelNoPedestal) { console.log("O anel já está no seu lugar."); return "Entrada_Templo"; }
                console.log("Você coloca o Anel de Prata no pedestal da esquerda. Ele se encaixa perfeitamente.");
                anelNoPedestal = true;
                inventario = inventario.filter(item => item !== "Anel de Prata");
                if (caliceNoPedestal) { portaTemploAberta = true; console.log("Com os dois itens nos seus lugares, a porta de pedra range e se abre lentamente."); }
                return "Entrada_Templo";
            },
            "USAR CÁLICE": () => {
                if (!inventario.includes("Cálice Antigo")) { console.log("Você não tem este item."); return "Entrada_Templo"; }
                if (caliceNoPedestal) { console.log("O cálice já está no seu lugar."); return "Entrada_Templo"; }
                console.log("Você coloca o Cálice Antigo no pedestal da direita. Ele se assenta com precisão.");
                caliceNoPedestal = true;
                inventario = inventario.filter(item => item !== "Cálice Antigo");
                if (anelNoPedestal) { portaTemploAberta = true; console.log("Com os dois itens nos seus lugares, a porta de pedra range e se abre lentamente."); }
                return "Entrada_Templo";
            },
            "ENTRAR": () => {
                if (portaTemploAberta) return "Interior_Templo";
                else { console.log("A porta de pedra está selada."); return "Entrada_Templo"; }
            },
            "SAIR": () => "Outra_Margem_Rio"
        }
    },
    Interior_Templo: {
        descricao: () => {
            if (puzzleRunasResolvido) return "O círculo de runas no chão permanece aberto, revelando a escada para as profundezas.";
            let desc = "No centro do salão, há um círculo de quatro grandes runas: LUZ, SOMBRA, CAOS e EQUILÍBRIO.";
            if (runasAcesas.length > 0) desc += `\nAs seguintes runas brilham fracamente: ${runasAcesas.join(', ')}.`;
            return desc;
        },
        conexoes: {
            "LUZ": () => resolverPuzzleRunas("LUZ"), "SOMBRA": () => resolverPuzzleRunas("SOMBRA"), "CAOS": () => resolverPuzzleRunas("CAOS"), "EQUILÍBRIO": () => resolverPuzzleRunas("EQUILÍBRIO"),
            "DESCER ESCADA": () => {
                if (puzzleRunasResolvido) return "Profundezas_Templo";
                else { console.log("Não há nenhuma escada visível."); return "Interior_Templo"; }
            },
            "SAIR": () => "Entrada_Templo"
        }
    },
    Profundezas_Templo: {
        descricao: () => livroLido ? "A câmara agora está silenciosa. O pedestal onde o livro repousava está vazio." : "A escada leva a uma câmara fria. No centro, sobre um pedestal, repousa um livro antigo.",
        conexoes: {
            "LER LIVRO": () => {
                if (livroLido) { console.log("Você já leu o livro."); return "Profundezas_Templo"; }
                livroLido = true;
                inventario.push("Primeira Lasca do Coração de Ébano");
                console.log(`
Você abre o livro antigo. As palavras fluem para a sua mente...
'O Coração de Ébano não é um só, mas vários. Fragmentado na grande guerra,
cada lasca guarda o poder de um deus caído. Juntá-las é arriscar o regresso
da escuridão... ou a purificação definitiva da luz.'
Ao fechar o livro, uma página se desfaz, revelando um compartimento secreto.
Dentro, você encontra uma pequena lasca de obsidiana que pulsa com poder.
--> 'Primeira Lasca do Coração de Ébano' foi adicionado ao seu inventário.
Você sente que a sua busca está apenas a começar.
O destino de Aveltor parece um pouco mais claro, e muito mais pesado.
FIM DA PRIMEIRA PARTE...`);
//                process.exit(0);
                throw new Error("Encerrado!");
            },
            "SUBIR": () => "Interior_Templo"
        }
    },
};
function resolverPuzzleRunas(runaEscolhida) {
    if (puzzleRunasResolvido) {
        console.log("As runas estão inativas. O caminho já foi aberto.");
        return "Interior_Templo";
    }
    runasAcesas.push(runaEscolhida);
    const indiceAtual = runasAcesas.length - 1;
    if (runasAcesas[indiceAtual] === sequenciaRunasCorreta[indiceAtual]) {
        console.log(`A Runa da ${runaEscolhida} brilha com uma luz constante...`);
        if (runasAcesas.length === sequenciaRunasCorreta.length) {
            console.log("\nAo tocar a última runa, todas explodem em luz! O chão treme e revela uma escada.");
            puzzleRunasResolvido = true;
            runasAcesas = [];
        }
    } else {
        console.log(`A Runa da ${runaEscolhida} pisca em vermelho e todas as luzes se apagam. A sequência foi quebrada.`);
        runasAcesas = [];
    }
    return "Interior_Templo";
}
let salaAtual = salas["Centro"];
while (true) {
    console.log();
    if (!salaAtual) {
        console.error("ERRO CRÍTICO: O jogador está perdido no vazio! A reiniciar no centro da cidade.");
        salaAtual = salas["Centro"];
    }
    console.log(salaAtual.descricao());

    let opcoesDisponiveis = Object.keys(salaAtual.conexoes);
    if (inventario.includes("Bilhete Amassado")) { opcoesDisponiveis.push("LER BILHETE"); }
    opcoesDisponiveis.push("INVENTARIO");
    opcoesDisponiveis.push("SAIR");
    console.log("Opções:", opcoesDisponiveis.join(", "));
    
    const comando = (await prompt("> ")).toUpperCase();

    if (comando === "SAIR") { console.log("Até à próxima, aventureiro!"); break; }
    if (comando === "INVENTARIO" || comando === "I") { if (inventario.length === 0) { console.log("O seu inventário está vazio."); } else { console.log("Você está a carregar:\n- " + inventario.join("\n- ")); } continue; }
    if (comando === "LER BILHETE" || comando === "LER BILHETE AMASSADO") {
        if (inventario.includes("Bilhete Amassado")) {
            console.log(`
Você abre o bilhete com cuidado. A caligrafia é antiga e tremida:
-----------------------------------------------------------------
Cem anos de penitência... mas o tesouro que escondi ainda me condena.
Onde o sol do meio-dia não alcança, debaixo do guardião de pedra,
meu arrependimento descansa.
-----------------------------------------------------------------`);
        } else { console.log("Você não tem esse item para ler."); }
        continue;
    }

    const destino = salaAtual.conexoes[comando];
    if (destino) {
        const proximaSalaNome = destino();
        if (salas[proximaSalaNome]) {
            salaAtual = salas[proximaSalaNome];
        }
    }
    else { console.log("Comando inválido."); }
}

}