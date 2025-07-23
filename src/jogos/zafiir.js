//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function zafiir() {

const objetos = [
    { nome: "Risty", descricao: "Cartão com o logo 'R.I.S.T.Y.'", posicao: "EquipamentosRisty" },
    { nome: "Zaafiir", descricao: "Cartão com o logo 'Za'fiir'", posicao: "Dormitório" },
];

let localizacaoAtual = "Sede";
let inventario = [];
let jogoAtivo = true;

let vidaJogador = 100;
let vidaZaafiir = 120;

const mapa = {
    Sede: {
        descricao: () => `A luz fria de um monitor solitário te arranca da inconsciência.
        Você está deitado no chão de um ambiente estéril, que vibra com o zumbido baixo de máquinas.
        Painéis de metal e equipamentos de alta tecnologia não deixam dúvida: isto é um laboratório...
        e parece ser secreto. Muito secreto.`,
        conexoes: () => ({ L: () => "Refeitório", O: () => "Dormitório", N: () => "ExperimentosRisty", S: () => "ProjetoZaFiir" }),
    },
    Refeitório: {
        descricao: () => `O cenário é de puro caos. Mesas e cadeiras viradas, comida espalhada e pratos quebrados cobrem o chão. Uma luz de emergência pisca sem parar, revelando e escondendo manchas escuras e secas no piso.`,
        conexoes: () => ({ O: () => "Sede" }),
    },
    Dormitório: {
        descricao: () => `A desordem aqui é pessoal. Beliches de metal estão desalinhadas e armários foram abertos à força. Em meio à bagunça, sobre uma pequena escrivaninha, algo chama sua atenção: um cartão de acesso com o logo 'Zaafiir'.`,
        conexoes: () => ({ L: () => "Sede" }),
    },
    ExperimentosRisty: {
        descricao: () => `As portas automáticas se abrem com um chiado, liberando uma névoa fria. O ar tem um cheiro químico e antisséptico. Ao fundo, iluminado por uma luz azulada, um letreiro na parede se torna visível: 'SETOR DE EXPERIMENTOS R.I.S.T.Y.'`,
        conexoes: () => ({ L: () => "TanqueXLH2", O: () => "EquipamentosRisty", N: () => "CasulosLH3", S: () => "Sede" }),
    },
    TanqueXLH2: {
        descricao: () => `A sala é dominada por enormes tanques de vidro, do chão ao teto, cheios de um líquido âmbar borbulhante. Dentro de cada um, uma silhueta humanoide flutua imóvel.`,
        conexoes: () => ({ O: () => "ExperimentosRisty" }),
    },
    EquipamentosRisty: {
        descricao: () => `Esta sala é um arsenal. Em racks na parede, você vê rifles de dardos e armaduras de combate arranhadas. Ao fundo você encontra um cartão com o logo 'Risty'.`,
        conexoes: () => ({ L: () => "ExperimentosRisty", N: () => "CasulosLH3" }),
    },
    CasulosLH3: {
        descricao: () => `Incubadoras orgânicas emitem bipes lentos e constantes, mas um dos casulos está violado, rasgado de dentro para fora. À sua direita (Leste), você nota uma porta de segurança, trancada com um leitor de cartão.`,
        conexoes: () => ({
            L: () => {
                if (inventario.includes("Risty")) {
                    console.log("\n>> Você passa o cartão 'Risty'. A porta para o Centro de Pesquisa destranca.");
                    return "CentroDePesquisa";
                }
                console.log("\n>> A porta está trancada. O leitor de cartões pisca, aguardando um cartão de acesso.");
                return null;
            },
            O: () => "EquipamentosRisty",
            S: () => "ExperimentosRisty",
        }),
    },
    CentroDePesquisa: {
        descricao: () => `O cérebro da operação. Dezenas de monitores piscam com gráficos e plantas do complexo. Você percebe uma corrente de ar vindo de trás de um rack de servidores.`,
        conexoes: () => ({ O: () => "CasulosLH3", N: () => "PassagemSecreta" }),
    },
    PassagemSecreta: {
        descricao: () => `A passagem leva a um beco sem saída, bloqueado por uma porta de metal com um teclado numérico. Ao lado, arranhado no metal, você vê: S1426.`,
        conexoes: () => ({
            O: () => "CentroDePesquisa",
            S1426: () => {
                console.log("\n>> Você digita o código 'S1426'. A porta de metal desliza para o lado.");
                return "CriaturaZaFiir";
            },
        }),
    },
    ProjetoZaFiir: {
        descricao: () => `O epicentro da pesquisa. Mapas genéticos e relatórios de contenção falhos sobre 'Za'fiir' cobrem as superfícies. Um grande cilindro de vidro estilhaçado no centro da sala sugere que o 'projeto' não está mais aqui.`,
        conexoes: () => ({ L: () => "Depósito", O: () => "NúcleoDeExperimentos", N: () => "Sede" }),
    },
    Depósito: {
        descricao: () => `Poeira e ozônio. Prateleiras de metal se estendem até o teto, repletas de caixas e equipamentos antigos. Uma única lâmpada pisca, lançando sombras dançantes.`,
        conexoes: () => ({ O: () => "ProjetoZaFiir" }),
    },
    NúcleoDeExperimentos: {
        descricao: () => `O ar aqui é gelado. Cabos grossos correm pelo chão, convergindo para um terminal central que pisca com um alerta vermelho: 'PROJETO ZA'FIIR'.`,
        conexoes: () => ({ L: () => "ProjetoZaFiir", S: () => "ProjetoSecreto" }),
    },
    ProjetoSecreto: {
        descricao: () => `Uma área limpa e restrita. Uma porta de aço reforçada ao norte bloqueia o caminho. Ao lado, um leitor de cartão exige um cartão com o logo 'Zaafiir'. Um som rítmico, como uma respiração, pode ser ouvido do outro lado.`,
        conexoes: () => ({
            N: () => {
                if (inventario.includes("Zaafiir")) {
                    console.log("\n>> Você insere o cartão 'Zaafiir'. As travas pesadas da porta de aço se retraem.");
                    return "CriaturaZaFiir";
                }
                console.log("\n>> A porta está trancada. O leitor de cartões pisca, aguardando um cartão de acesso.");
                return null;
            },
            S: () => "NúcleoDeExperimentos",
        }),
    },
    CriaturaZaFiir: {
        descricao: () => `Ao abrir a porta, um som gutural congela seu sangue.
        Ali, no canto da sala, aninhada entre cabos partidos, está a criatura 'Za'fiir'. 
        É maior do que você imaginava, com uma pele que parece absorver a luz. 
        Ela te observa com uma inteligência fria e se prepara para o combate!`,
        conexoes: () => ({}),
    },
};

async function iniciarDuelo() {
    console.log(mapa.CriaturaZaFiir.descricao());
    
    while (vidaJogador > 0 && vidaZaafiir > 0) {
        console.log("\n========================================");
        console.log(`SUA VIDA: ${vidaJogador} HP`);
        console.log(`VIDA DE ZA'FIIR: ${vidaZaafiir} HP`);
        console.log("----------------------------------------");
        console.log("Escolha sua ação: [atacar], [defender], [esquivar]");
        
        let acaoJogador = "";
        while (!["atacar", "defender", "esquivar"].includes(acaoJogador)) {
            acaoJogador = (await prompt("> ")).toLowerCase();
            if (!["atacar", "defender", "esquivar"].includes(acaoJogador)) {
                console.log("Comando inválido. Escolha [atacar], [defender] ou [esquivar].");
            }
        }
        
        const acoesMonstro = ["atacar", "defender"];
        const acaoMonstro = acoesMonstro[Math.floor(Math.random() * acoesMonstro.length)];
        
        const danoBase = Math.floor(Math.random() * 11) + 10;

        console.log("----------------------------------------");

        if (acaoJogador === "atacar") {
            if (acaoMonstro === "atacar") {
                console.log(">> Ambos atacam ao mesmo tempo!");
                console.log(`>> Você recebe ${danoBase} de dano.`);
                console.log(`>> Za'fiir recebe ${danoBase} de dano.`);
                vidaJogador -= danoBase;
                vidaZaafiir -= danoBase;
            } else {
                console.log(">> Você ataca, mas Za'fiir se defende. Ninguém se fere.");
            }
        } else if (acaoJogador === "defender") {
            if (acaoMonstro === "atacar") {
                console.log(">> Za'fiir ataca, mas você se defende. Ninguém se fere.");
            } else {
                console.log(">> Você mantem uma postura defensiva, mas Za'fiir aproveita uma brecha e te ataca!");
                console.log(`>> Você recebe ${danoBase} de dano.`);
                vidaJogador -= danoBase;
            }
        } else if (acaoJogador === "esquivar") {
            if (acaoMonstro === "atacar") {
                const chancePrevisao = Math.random(); 

                if (chancePrevisao < 0.3) {
                    const danoPrevisto = danoBase + 5;
                    console.log(">> VOCÊ TENTA SE ESQUIVAR, MAS ZA'FIIR PREVÊ SEU MOVIMENTO!");
                    console.log(`>> O ataque te acerta em cheio, causando ${danoPrevisto} de dano crítico!`);
                    vidaJogador -= danoPrevisto;
                } else {
                    const danoEsquiva = danoBase + 5;
                    console.log(">> Você se esquiva do ataque de Za'fiir e contra-ataca com precisão!");
                    console.log(`>> Za'fiir recebe ${danoEsquiva} de dano.`);
                    vidaZaafiir -= danoEsquiva;
                }
            } else {
                console.log(">> Você se prepara para esquivar, mas Za'fiir não ataca. Nada acontece.");
            }
        }
    }
    
    console.log("\n================ FIM DE JOGO ================");
    if (vidaJogador <= 0) {
        console.log("Você não resistiu aos ferimentos. A escuridão te consome...");
        console.log("A criatura Za'fiir está livre.");
    } else {
        console.log("Com um último golpe, a criatura monstruosa cai sem vida no chão.");
        console.log("Você conseguiu. Você sobreviveu... por enquanto.");
    }
    
    jogoAtivo = false;
}

console.log(mapa[localizacaoAtual].descricao());

while (jogoAtivo) {
    if (localizacaoAtual === "CriaturaZaFiir") {
        await iniciarDuelo();
        continue;
    }

    console.log();
    console.log("Comandos disponíveis:");

    const itensNaSala = objetos.filter(obj => obj.posicao === localizacaoAtual);
    itensNaSala.forEach(item => {
        console.log(`- pegar ${item.nome.toLowerCase()}`);
    });

    const conexoesDaSala = mapa[localizacaoAtual].conexoes();
    for (const direcao in conexoesDaSala) {
        if (direcao.length > 1) continue;
        console.log(`- ${direcao.toLowerCase()}`);
    }
    console.log("- inventario");

    const comando = await prompt("> ");
    const [acao, ...argumentos] = comando.toLowerCase().split(" ");
    const argumento = argumentos.join(" ");

    if (acao === "pegar") {
        const itemParaPegar = itensNaSala.find(item => item.nome.toLowerCase() === argumento);
        if (itemParaPegar) {
            itemParaPegar.posicao = "inventario";
            inventario.push(itemParaPegar.nome);
            console.log(`\n>> Você pegou: ${itemParaPegar.nome}.`);
            
            const descricaoAtualDaSala = mapa[localizacaoAtual].descricao();
            const sala = mapa[localizacaoAtual];
            
            sala.descricao = () => descricaoAtualDaSala
                .replace(` Em meio à bagunça, sobre uma pequena escrivaninha, algo chama sua atenção: um cartão de acesso com o logo '${itemParaPegar.nome}'.`, "")
                .replace(` Ao fundo você encontra um cartão com o logo '${itemParaPegar.nome}'.`, "");
        } else {
            console.log("Não há nada com esse nome para pegar aqui.");
        }
    } else if (acao === "inventario" || acao === "inv") {
        console.log("\nNo seu inventário você tem:");
        if (inventario.length > 0) {
            inventario.forEach(item => console.log(`- ${item}`));
        } else {
            console.log("Nada.");
        }
    } else {
        const direcaoOuAcao = comando.toUpperCase();
        const funcaoDestino = conexoesDaSala[direcaoOuAcao];

        if (funcaoDestino) {
            const proximaSala = funcaoDestino();
            if (proximaSala) {
                localizacaoAtual = proximaSala;
                console.log("----------------------------------------------------");
                if (localizacaoAtual !== "CriaturaZaFiir") {
                    console.log(mapa[localizacaoAtual].descricao());
                }
            }
        } else {
            console.log("Comando inválido ou caminho inexistente.");
        }
    }
}

}