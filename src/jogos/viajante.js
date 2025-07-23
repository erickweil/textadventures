//const prompt = require("prompt-sync")();
//const chalk = require('chalk');
import chalk from "chalk";
import { console, prompt, process, rl } from "../mockConsole";

export async function viajante() {

var firsttime = true;
var firsttime2 = false;
var firsttime3 = true;
var firsttime4 = false;
var firsttime5 = false;
var firsttime6 = false;
var firsttime7 = false;
var nome;
var alldiag = 0;
var combustivel = false;
var motor = false;
var cambio = false;
var carda = false;
var finalscene = true;
var firstposto = true;
var horafinal = true;

const cenarios = {
    menu: {
        descricao: () => {
            return console.log("Seja bem-vindo ao jogo O Tempo do Viajante! 🧭" +
                "\nBora jogar!");
        },
        conexoes: {
            "jogar": () => {
                console.clear();
                return "scania";
            },
            "criadores": () => {
                console.clear();
                return "creditos";
            }
        }
    },
    creditos: {
        descricao: () => {
            console.log("Criado com esforço por Gabriela e Leonardo. 🚛");
        },
        conexoes: {
            "voltar": () => {
                console.clear();
                return "menu";
            }
        }
    },
    scania: {
        descricao: () => {
            if (firsttime) {
                console.log(chalk.italic("*Este jogo se trata de um caminhoneiro " +
                    "que realiza uma entrega de produtos a um determinado" +
                    " destino,\nmas quando menos se espera...*\n\n") +
                    "Vish! Calculei errado a próxima parada, deveria ter" +
                    "passado no último posto de gasolina!" +
                    chalk.italic("\n\n*Seu caminhão parou de funcionar no meio da estrada*"));
            } else if (firsttime == false && firsttime4 == true) {
                console.log(chalk.italic("*Vocês retornaram ao seu caminhão.*"));
                console.log("Ok! Esse deve ser o seu caminhão, me aparece solúvel e não há a necessidade de retornar à mecânica.");
                console.log("Viajante " + nome + ", eu irei fazer o diagnóstico você pode ficar ao lado para consultar: ");
                firsttime4 = false;
            }
        },
        conexoes: {
            "ver a hora": () => {
                firsttime = false;
                console.clear();
                if (horafinal == true) {
                    console.log(chalk.italic("*Horário é 1:03PM agora, um dia normal.*"));
                } else {
                    console.log(chalk.italic("*Horário é 5:15PM agora, uma tardezinha confortável.*"));
                }
                return "scania";
            },
            "sair do veiculo": () => {
                firsttime = false;
                console.clear();
                console.log("Você saiu do veículo!");
                return "fora";
            },
            "dirigir": () => {
                console.clear();
                console.log(chalk.green("Parabéns, viajante! A história do jogo está concluída."));
                firsttime = true;
                firsttime2 = false;
                firsttime3 = true;
                firsttime4 = false;
                firsttime5 = false;
                firsttime6 = false;
                firsttime7 = false;
                nome = "";
                alldiag = 0;
                combustivel = false;
                motor = false;
                cambio = false;
                carda = false;
                finalscene = true;
                firstposto = true;
                horafinal = true;
                return "menu"
            }
        }
    },
    fora: {
        descricao: () => {
            if (firsttime6 == false) {
                console.log(chalk.italic("*Preciso retornar ao último posto de gasolina, está vazando óleo...*"));
            } else if (firsttime7 == false) {
                console.log("Ok! Vamos solucionar! " + chalk.italic("*Disse o mecânico.*"));
                firsttime7 = true;
            } else {
                console.log(chalk.italic("*Agora que está tudo finalizado, vamos voltar para a estrada!*"));
                finalscene = false;
            }
        },
        conexoes: {
            "N": () => {
                console.clear();
                return "outroLadoEstrada"
            },
            "L": () => {
                console.clear();
                return "frenteEstrada"
            },
            "O (voltar ao posto)": () => {
                console.clear();
                return "posto"
            },
            "entrar no veiculo": () => {
                console.clear();
                console.log(chalk.italic("*Você entrou em seu veículo!*"));
                return "scania"
            },
            "diagnostico": () => {
                console.clear();
                console.log("Viajante " + nome + ", eu irei fazer o diagnóstico você pode ficar ao lado para consultar.");
                return "diagnostico"
            }
        }
    },
    diagnostico: {
        descricao: () => {
            console.log("Escolha o que você gostaria de inspecionar:");
        },
        conexoes: {
            "checar o combustivel": () => {
                console.clear();
                combustivel = true;
                console.log("Tudo ok com o sistema de abastecimento. O nível está dentro do esperado e não há sinais de impurezas.");
                alldiag++;
                if (alldiag == 4) {
                    return "fix"
                } else {
                    return "diagnostico"
                }
            },
            "verificar o motor": () => {
                console.clear();
                motor = true;
                console.log("O motor está falhando por causa de velas desgastadas e excesso de carbonização nos pistões. Por causa disso surge o vazamento de óleo.");
                alldiag++;
                if (alldiag == 4) {
                    return "fix"
                } else {
                    return "diagnostico"
                }
            },
            "checar a caixa de cambio": () => {
                console.clear();
                cambio = true;
                console.log("Tudo ok. As trocas estão suaves, sem ruídos ou vazamentos aparentes.");
                alldiag++;
                if (alldiag == 4) {
                    return "fix"
                } else {
                    return "diagnostico"
                }
            },
            "checar o carda": () => {
                console.clear();
                carda = true;
                console.log("Tudo ok. Sem folgas ou desgaste nas juntas. Funcionamento estável.");
                alldiag++;
                if (alldiag == 4) {
                    return "fix"
                } else {
                    return "diagnostico"
                }
            }
        }
    },
    fix: {
        descricao: () => {
            console.log("Bem, para isso substituirei as velas de ignição e realizarei uma\n limpeza nos pistões para remover a carbonização. Depois disso, troca as juntas \n para conter o vazamento de óleo. Ok?");
        },
        conexoes: {
            "ok": () => {
                console.clear();
                console.log(chalk.italic("*Agora está finalizado, pronto para voltar ao meu trabalho.*"));
                return "finalizado"
            }
        }
    },
    finalizado: {
        descricao: () => {

        },
        conexoes: {
            "muito obrigado, mao de broca": () => {
                console.clear();
                console.log("De nada, meu viajante " + nome + "! Pode voltar ao seu trabalho e, lembre-se, o motor clama por reparos antes que o tempo o condene à ferrugem eterna");
                return "fora"
            }
        }
    },
    frenteEstrada: {
        descricao: () => {
            console.log("Esse é o horizonte que eu passarei... caso " +
                chalk.bold("volte a funcionar o caminhão."));
        },
        conexoes: {
            "O": () => {
                console.clear();
                console.log("O nosso bom e velho caminhão está parado aqui na estrada.");
                return "fora"
            }
        }
    },
    outroLadoEstrada: {
        descricao: () => {
            console.log("Não há nada por aqui pelo outro lado da estrada!");
        },
        conexoes: {
            "S": () => {
                console.clear();
                console.log("O nosso bom e velho caminhão está parado aqui na estrada.");
                return "fora"
            }
        }
    },
    posto: {
        descricao: () => {
            if (firstposto == true) {
                console.log("Você decide, com determinação, voltar ao último " +
                    "posto de gasolina a pé. Passa-se 4 horas direto e você \n" +
                    "chegou ao seu destino temporário.");
            } else {
                console.log("Finalmente eu estou no posto!");
            }
        },
        conexoes: {
            "frentista": () => {
                console.clear();
                console.log(chalk.italic("*Há um frentista, você pode conversar com ele para poder resolver*"));
                firstposto = false;
                return "frentista"
            }
        }
    },
    frentista: {
        descricao: () => {
            console.log("Olá! Meu nome é Elias, como posso lhe ajudar? 😅");
        },
        conexoes: {
            "continuar": () => {
                console.clear();
                return "continuar"
            },
            "sair": () => {
                console.clear();
                console.log("Tenha um bom dia, viajante! 😃");
                firsttime2 = true;
                return "posto"
            }
        }
    },
    continuar: {
        descricao: () => {
            if (firsttime2 == false) {
                console.log("Deu problema no seu caminhão? 😧 Ele está longe? 😨 Bem, converse " +
                    "com o nosso mecânico aqui ao lado para \npuxar com guincho, ele é conhecido como 'mão de broca'. 🤠");
                firsttime2 = true;
            } else if (firsttime2 == true) {
                console.log("Você necessita de ir ao mecânico, meu viajante! 😊");
            }
        },
        conexoes: {
            "ir para a mecanica": () => {
                console.clear();
                console.log(chalk.italic("*Há um mecânico conhecido como o Mão de broca nesse lugar!*"));
                return "mecanica"
            }
        }
    },
    mecanica: {
        descricao: async () => {
            console.log(chalk.italic("*Você encontrou ele!*"));
            if (firsttime3) {
                console.log("Olá viajante! Qual é o seu nome?");
                nome = await prompt(">");
                console.clear();
                console.log("Ok, " + nome + "! Seu veículo está aqui? Está longe na estrada? " +
                    "Ok! Vamos nessa, eu dirijo o guincho.");
                firsttime3 = false;
            } else {
                console.log("Fala " + nome + "! Vamos retornar ao seu caminhão?");
            }
        },
        conexoes: {
            "voltar ao caminhao": () => {
                console.clear();
                console.log(chalk.italic("*Depois 12 minutos, você retorna ao seu caminhão, junto com o mecânico pela estrada de guincho.*"));
                firsttime4 = true;
                firsttime5 = true;
                firsttime6 = true;
                horafinal = false;
                return "fora"
            },
            "sair": () => {
                console.clear();
                console.log("Tenha um bom dia, " + nome + "!");
                return "posto"
            }
        }

    }
};

let cenarioAtual = cenarios["menu"];
console.clear();

while (true) {

    await cenarioAtual.descricao();
    for (let chave in cenarioAtual.conexoes) {
        /*if(chave == "continuar" && firsttime2 == false){
            continue;
        } else*/ if (chave == "O (voltar ao posto)" && firsttime5 == true) {
            continue;
        } else if (chave == "diagnostico" && firsttime7 == false) {
            continue;
        } else if (chave == "checar o combustivel" && combustivel == true) {
            continue;
        } else if (chave == "verificar o motor" && motor == true) {
            continue;
        } else if (chave == "checar a caixa de cambio" && cambio == true) {
            continue;
        } else if (chave == "checar o carda" && carda == true) {
            continue;
        } else if (chave == "dirigir" && finalscene == true) {
            continue;
        }
        console.log("-", chave);
    }

    const comando = await prompt(">");
    if (!comando) {
        return;
    }

    const destino = cenarioAtual.conexoes[comando];
    if (destino) {
        cenarioAtual = cenarios[destino()];
    } else {
        console.clear();
        console.log(chalk.red("Comando inválido no seu contexto!"));
    }
}

}