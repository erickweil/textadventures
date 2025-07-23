//const prompt = require("prompt-sync")();
//const chalk = require("chalk");
import chalk from "chalk";
import { console, prompt, process, rl } from "../mockConsole";

export async function assombrada() {

let inventario = ["lanterna velha"];
let bateriaLanterna = 25;
let lanternaLigada = false;

let portaEntradaAberta = false;
let tvLigada = false;
let alcapaoAberto = false;
let janelaAberta = true;
let portaPoraoTrancada = true;

const salas = {
    'EXTERIOR': {
        descricao: () => {
            if (portaEntradaAberta) {
                return "A porta da casa tá escancarada, um buraco escuro te convidando pra entrar. \nParece uma péssima ideia. Mas você é curioso, né?\n";
            }
            return "Você está aqui. Na frente de um casarão que parece que vai desmoronar se você espirrar. \nA porta tá fechada. Vai encarar ou vai correr?\n";
        },
        conexoes: {
            'entrar': () => {
                if (portaEntradaAberta) {
                    return 'SALA DE ESTAR';
                } else {
                    console.log("A porta está trancada. Vai ter que dar um jeito de abrir.\n");
                    return 'EXTERIOR';
                }
            },
            'abrir': () => {
                if (portaEntradaAberta) {
                    console.log("Já tá aberta. Não precisa arrombar.");
                } else {
                    portaEntradaAberta = true;
                    console.log("Com um rangido que parece um grito, a porta se abre.");
                    console.log(chalk.red.bold.inverse("Boa sorte aí dentro."));
                }
                return 'EXTERIOR';
            }
        }
    },
    'SALA DE ESTAR': {
        luz: true,
        descricao: () => {
            let texto = "Você entrou. Parabéns? A sala tá cheia de móveis cobertos com lençóis, parecendo um exército de fantasmas preguiçosos. \nTem uma TV velha no canto e um corredor escuro que grita 'NÃO ENTRE AQUI'.\n";
            if (tvLigada) {
                texto = "A TV tá ligada no modo 'pesadelo', só com chiado e umas sombras que parecem dançar. \nAs vozes no chiado tão falando seu nome ou é impressão sua?\n";
            }
            return texto;
        },
        conexoes: {
            'leste': () => 'CORREDOR',
            'sair': () => 'EXTERIOR',
            'ligar tv': () => {
                if (!tvLigada) {
                    tvLigada = true;
                    console.log(chalk.magenta("Você liga a TV. O chiado é tão alto que seus dentes doem."));
                } else {
                    console.log(chalk.yellow("Já tá ligada. Quer aumentar o volume?"));
                }
                return 'SALA DE ESTAR';
            },
            'desligar tv': () => {
                if (tvLigada) {
                    tvLigada = false;
                    console.log(chalk.magenta("Você desliga a TV. O silêncio que fica parece ainda pior."));
                } else {
                    console.log(chalk.yellow("Já tá desligada. Medo do escuro?"));
                }
                return 'SALA DE ESTAR';
            }
        }
    },
    'CORREDOR': {
        luz: false,
        descricao: () => "Ok, agora você tá num corredor apertado e escuro.\nO papel de parede tá caindo aos pedaços, mostrando umas manchas nojentas que parecem se mexer. \nTem portas pra tudo que é lado. Escolha seu o seu destino.\n",
        conexoes: {
            'leste': () => 'COZINHA',
            'sul': () => 'BIBLIOTECA',
            'oeste': () => 'SALA DE ESTAR'
        }
    },
    'BIBLIOTECA': {
        luz: false,
        item: "pagina de diario",
        descricao: () => {
            let texto = "Uma biblioteca! Ou o que sobrou dela. Cheiro de poeira e tristeza. \nLivros velhos por toda parte. Numa mesa, tem uma página de diário. Alguém teve um dia bem ruim aqui.\n";
            if (!salas['BIBLIOTECA'].item) {
                texto = "Ainda é uma biblioteca triste e empoeirada. Nada de novo por aqui, só livros que ninguém nunca mais vai ler.\n";
            }
            return texto;
        },
        conexoes: {
            'norte': () => 'CORREDOR',
            'pegar diario': () => {
                if (salas['BIBLIOTECA'].item) {
                    console.log(chalk.grey("Você pegou a página. A letra é puro pânico. Bom pra você."));
                    inventario.push("pagina de diario");
                    salas['BIBLIOTECA'].item = null;
                } else {
                    console.log(chalk.yellow("Já pegou, espertinho."));
                }
                return 'BIBLIOTECA';
            }
        }
    },
    'COZINHA': {
        luz: true,
        item: "pe de cabra",
        descricao: () => {
            let partes = [
                "Eca. A cozinha é nojenta. Tem prato sujo pra todo lado e um cheiro que faria um gambá desmaiar.\n",
                "No teto, tem um alçapão que parece uma péssima ideia.\n"
            ];
            if (salas['COZINHA'].item) {
                partes.push("No meio da nojeira, tem um pé de cabra. Parece útil pra quebrar coisas. Ou pra se defender. Vai saber.\n");
            }
            if (alcapaoAberto) {
                partes[1] = "O alçapão tá aberto, mostrando um buraco de escuridão total. Sabe o que dizem sobre o abismo olhar de volta? É isso aí.\n";
            }
            return partes.join(" ");
        },
        conexoes: {
            'oeste': () => 'CORREDOR',
            'sul': () => 'QUARTO',
            'subir para o sotao': () => {
                if (alcapaoAberto) {
                    return 'SOTAO';
                } else {
                    console.log(chalk.red("O alçapão tá fechado. Vai precisar de mais que a força do ódio pra abrir."));
                    return 'COZINHA';
                }
            },
            'descer para o porao': () => 'PORAO',
            'abrir alcapao': () => {
                if (alcapaoAberto) {
                    console.log(chalk.yellow("Já tá aberto, campeão."));
                } else {
                    if (inventario.includes("pe de cabra")) {
                        alcapaoAberto = true;
                        console.log(chalk.red("Você usa o pé de cabra e a madeira velha cede com um estalo. Que barulho gostoso de destruição."));
                    } else {
                        console.log(chalk.green("Você tenta abrir com as mãos e só consegue umas farpas. Precisa de uma ferramenta."));
                    }
                }
                return 'COZINHA';
            },
            'pegar pe de cabra': () => {
                if (salas['COZINHA'].item) {
                    console.log(chalk.green("Você pegou o pé de cabra. Agora você se sente 10% mais perigoso."));
                    inventario.push("pe de cabra");
                    salas['COZINHA'].item = null;
                } else {
                    console.log(chalk.yellow("Já pegou. Esqueceu?"));
                }
                return 'COZINHA';
            }
        }
    },
    'QUARTO': {
        luz: true,
        descricao: () => {
            let texto = "Que quarto sinistro. Parece que era de uma criança, mas o papel de parede com desenhos de bichinhos parece te seguir com os olhos. \nA janela tá aberta, te tentando com a ideia de pular.";
            if (!janelaAberta) {
                texto = "Você fechou a janela. Agora o quarto tá abafado e as figuras na parede parecem ainda mais irritadas com a sua presença. Boa escolha.";
            }
            return texto;
        },
        conexoes: {
            'norte': () => 'COZINHA',
            'pular janela': () => {
                if (janelaAberta) {
                    console.log(chalk.red("Você pula. Por um segundo você acha que conseguiu, mas cai nos arbustos e, quando levanta, tá na frente da casa de novo. \nEla não vai te deixar sair tão fácil."));
                    return 'EXTERIOR';
                } else {
                    console.log(chalk.green("A janela tá fechada. Não dá pra pular através de vidro. Eu acho."));
                    return 'QUARTO';
                }
            },
            'fechar janela': () => {
                janelaAberta = false;
                console.log("Você fecha a janela. O barulho do vento para, mas agora você pode ouvir a sua própria respiração apavorada.");
                return 'QUARTO';
            },
            'abrir janela': () => {
                janelaAberta = true;
                console.log("Você abre a janela. O ar fresco é bom, mas não tira o cheiro de medo do quarto.");
                return 'QUARTO';
            }
        }
    },
    'SOTAO': {
        luz: false,
        item: "chave pequena",
        descricao: () => {
            let texto = "Bem-vindo ao sótão, o lugar onde as coisas vêm para morrer. \nTá escuro pra caramba, cheio de tralha e poeira. Sua lanterna mostra uma chave brilhando em cima de um baú. Será que é uma armadilha?";
            if (!salas['SOTAO'].item) {
                texto = "O sótão continua sendo um depósito de coisas velhas e assustadoras. \nA chave já era, agora só tem poeira e arrependimento.";
            }
            return texto;
        },
        conexoes: {
            'descer': () => 'COZINHA',
            'pegar chave': () => {
                if (salas['SOTAO'].item) {
                    console.log(chalk.green("Você pegou a chave. Ela é pequena e fria, como a mão de um fantasma."));
                    inventario.push("chave pequena");
                    salas['SOTAO'].item = null;
                } else {
                    console.log(chalk.green("Já pegou a chave, apressadinho."));
                }
                return 'SOTAO';
            }
        }
    },
    'PORAO': {
        luz: false,
        descricao: () => {
            let texto = "Descer aqui foi uma péssima ideia. O porão é escuro, úmido e cheira a terra de cemitério. \nVocê tem a nítida sensação de que tem mais alguém aqui com você. Tem uma porta de madeira que parece ser a sua única chance.\n";
            if (!portaPoraoTrancada) {
                texto = "A porta de madeira tá destrancada. Um ventinho frio sopra lá de fora, cheirando a liberdade. \nTá esperando o quê? Um convite?\n";
            }
            return texto;
        },
        conexoes: {
            'subir': () => 'COZINHA',
            'abrir porta': () => {
                if (portaPoraoTrancada) {
                    if (inventario.includes("chave pequena")) {
                        portaPoraoTrancada = false;
                        console.log(chalk.red.bold("Você usa a chave do sótão. A fechadura faz um 'CLICK' alto e a porta se abre. Finalmente!"));
                    } else {
                        console.log(chalk.green("A porta tá trancada. Vai precisar de uma chave, gênio."));
                    }
                } else {
                    console.log(chalk.yellow("A porta já tá aberta. Vai ou não vai?"));
                }
                return 'PORAO';
            },
            'escapar': () => {
                if (!portaPoraoTrancada) {
                    console.log(chalk.bgGreen.bold("\nVocê chuta a porta e corre pra noite. Você tá livre, mas com uns traumas novos. Parabéns!"));
                    return 'FIM';
                } else {
                    console.log(chalk.yellow("Escapar por uma porta trancada? Boa sorte com isso."));
                    return 'PORAO';
                }
            }
        }
    }
};



let salaAtual = salas['EXTERIOR'];

console.log("A noite está fria. Você se encontra diante de uma casa abandonada. Um desafio ou um erro? Só há uma maneira de descobrir.");

while (true) {
    console.log();

    if (salaAtual.luz || lanternaLigada) {
        console.log(salaAtual.descricao());
        for (const acao in salaAtual.conexoes) {
            console.log(`- ${acao}`);
        }
    } else {
        console.log("Está escuro como breu... Você não consegue ver nada.");
        console.log("Tente 'ligar lanterna'.\n");
    }

    if (lanternaLigada) {
        bateriaLanterna--;
        if (bateriaLanterna <= 5 && bateriaLanterna > 0) {
            console.log(`[A luz da sua lanterna está piscando. Bateria: ${bateriaLanterna}]\n`);
        }
        if (bateriaLanterna <= 0) {
            lanternaLigada = false;
            console.log("[A bateria da sua lanterna acabou!]\n");
        }
    }

    const comando = (await prompt("> ")).toLowerCase().trim();

    console.clear()

    if (!comando) {
        console.log("Por favor, digite um comando.");
        continue;
    }

    if (comando === 'sair') {
        console.log(chalk.bgRed.bold("Você se vira pra ir embora, mas todas as portas se trancam. Acha que é fácil?"));
        continue;
    }

    if (comando === 'parar jogo') {
        break;
    }

    if (comando === 'inventario') {
        console.log("Você está carregando: " + inventario.join(", "));
        continue;
    }
    
    if (comando === 'ler diario') {
        if (inventario.includes("pagina de diario")) {
            console.log("\n--- PÁGINA DO DIÁRIO ---\n'A casa me chama. Sinto que não estou sozinho. Os antigos donos falaram de uma chave... uma para o sotao, outra para a escuridão abaixo. \nEles disseram que a saída verdadeira só se revela para quem entende o coração da casa.\n");
        } else {
            console.log("Você não tem nenhuma página do diário para ler.");
        }
        continue;
    }

    if (comando === 'ligar lanterna') {
        if (inventario.includes("lanterna velha")) {
            if (bateriaLanterna > 0) {
                lanternaLigada = true;
                console.log("Você liga a lanterna. A escuridão recua um pouco.");
            } else {
                console.log("Você tenta, mas a bateria está completamente esgotada.");
            }
        } else {
            console.log("Você não tem uma lanterna.");
        }
        continue;
    }

    if (comando === 'desligar lanterna') {
        lanternaLigada = false;
        console.log("Você desliga a lanterna para economizar bateria.");
        continue;
    }

    const acao = salaAtual.conexoes[comando];
    if (acao) {
        const proximaSalaNome = acao();
        if (proximaSalaNome === 'FIM') {
            break;
        }
        if (proximaSalaNome && salas[proximaSalaNome]) {
            salaAtual = salas[proximaSalaNome];
        }
    } else {
        console.log("Comando inválido. Tente algo diferente.");
    }
}

}