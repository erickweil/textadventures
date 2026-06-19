import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import { getChalk } from "../../utils/chalk.js";

export function getSalasJogo(estadoJogo) {
let chalk = getChalk(true);
const salasJogo = {
    //Definição do Quarto;
    Quarto: {

        descricao: () => {

            //Se a porta estiver aberta ou fechada;
            if (estadoJogo.porta_aberta) {
                console.log(`\n\n${chalk.yellow("[QUARTO]")}`);
                console.log("Você está em frente da porta do seu quarto que está aberta.");
                console.log("Você encara o seu corredor, estático e silencioso.\n");
            } else {
                console.log(`\n\n${chalk.yellow("[QUARTO]")}`);
                console.log("Você está em seu quarto. A porta está trancada.");
                console.log("É um lugar seguro...,?\n");
            }

        },

        //Ações possíveis dentro do Quarto;
        conexoes: {

            //Sair do quarto para a sala de estar;
            "sair": () => {

                //Se a porta estiver aberta ou fechada;
                if (estadoJogo.porta_aberta) {
                    console.log("\n> Você sai do quarto, atravessa o corredor e entra na sala de estar.\n");
                    return "Sala";
                } else {
                    console.log(chalk.red("\n\n[!]A PORTA ESTÁ FECHADA.\n\nVocê não pode sair ainda.\n"));
                }

            },

            //Abre a porta;
            "abrir": () => {

                //Se a porta estiver aberta ou fechada;
                if (estadoJogo.porta_aberta) {
                    console.log(chalk.red("\n\n[!]A PORTA ESTÁ ABERTA, VOCÊ PODE SAIR.\n"));
                } else {
                    estadoJogo.porta_aberta = true;
                    console.log("\n> Você gira a chave e abre a porta lentamente.");
                }

            },

            //Fecha a porta;
            "fechar": () => {

                //Se a porta estiver aberta ou fechada;
                if (!estadoJogo.porta_aberta) {
                    console.log(chalk.red("\n\n[!]A PORTA ESTÁ FECHADA, VOCÊ NÃO PRECISA FECHAR.\n"));
                } else {
                    estadoJogo.porta_aberta = false;
                    console.log("\n> Você fecha a porta e tranca a mesma.");
                    console.log("\n> A porta está fechada e trancada.");
                }

            },

            //Avança o dia ou noite;
            "dormir": () => {

                if (!estadoJogo.noite) {
                    console.log("\n> Você decide descansar. O tempo passa...");
                    estadoJogo.noite = true;
                    estadoJogo.energia = 0;
                } else {
                    console.log("\n> Você dorme durante a noite. o tempo passa...");
                    estadoJogo.noite = false;
                    estadoJogo.energia = 3;
                    estadoJogo.dias++;
                }

            }

        }

    },

    //Definição da Sala (o "centro" da casa);
    Sala: {

        descricao: () => {

            //Se for noite ou dia;
            if (estadoJogo.noite) {
                console.log(`\n\n${chalk.yellow("[SALA]")}`);
                console.log("\nEstá escuro, mas visível. A luz da lua entra pela janela.");
                estadoJogo.fala_pessoa = Math.floor(Math.random() * 5) + 1;
                if (estadoJogo.fala_pessoa == 1) {
                    console.log("Você ouve batidas pesadas na porta de entrada.\n'Olá, alguém aí? Pode me deixar entrar?', diz uma voz estranha.");
                } else if (estadoJogo.fala_pessoa == 2) {
                    console.log("Você ouve um sussurro vindo da porta de entrada.\n'Posso entrar? Estou com frio', diz uma voz fraca.");
                } else if (estadoJogo.fala_pessoa == 3) {
                    console.log("Você ouve um grito abafado vindo da porta de entrada.\n'Por favor, me deixe entrar! Eles estão atrás de mim!', diz uma voz desesperada.");
                } else if (estadoJogo.fala_pessoa == 4) {
                    console.log("Você ouve um choro vindo da porta de entrada.\n'Posso entrar? Estou tão sozinha...', diz uma voz triste.");
                } else if (estadoJogo.fala_pessoa == 5) {
                    console.log("Você ouve uma risada sinistra vindo da porta de entrada.\n'Posso entrar? Quero brincar...', diz uma voz assustadora.");
                }
            } else {
                console.log(`\n\n${chalk.yellow("[SALA]")}`);
                console.log("O sol brilha lá fora. A casa parece normal.");
                console.log(`Você ainda tem disposição para investigar ${estadoJogo.energia} locais.`);
            }

        },

        //Ações possíveis dentro da Sala;
        conexoes: {
            "quarto": () => "Quarto",

            "cozinha": () => "Cozinha",

            "despensa": () => "Despensa",

            "banheiro": () => "Banheiro",

            "atender": () => {

                //Se for noite ou dia;
                if (estadoJogo.noite) {
                    console.log(" Você se aproxima da porta. A voz parece... humana? Ou... outra coisa?");

                    if (estadoJogo.pessoa_cozinha == false) {
                        estadoJogo.pessoa_cozinha = true;
                        console.log("> Agora você tem alguém na sua cozinha");

                    } else if (estadoJogo.pessoa_despensa == false) {
                        estadoJogo.pessoa_despensa = true;
                        console.log("> Agora você tem alguém na sua despensa");

                    } else if (estadoJogo.pessoa_banheiro == false) {
                        estadoJogo.pessoa_banheiro = true;
                        console.log("> Agora você tem alguém no seu banheiro");

                    } else {
                        console.log("> não há espaço para mais 'pessoas' na casa...");

                    }

                } else {
                    console.log("> Não há ninguém na porta agora.");

                }

            }

        }

    },

    //Definição da Cozinha;
    Cozinha: {

        //Se tem ou não uma "pessoa" na cozinha;
        descricao: () => {
            console.log(`\n\n${chalk.yellow("[COZINHA]")}`);
            console.log("O cheiro de comida enlatada está no ar.");

            if (estadoJogo.pessoa_cozinha) {
                console.log("A pessoa te olha, sentada à mesa.");

            } else {
                console.log("Você vê a pia, limpa, as cadeiras vazias, a mesa forrada... Só há você ali")

            }
        },

        //Ações possíveis dentro da Cozinha;
        conexoes: {
            "sala": () => "Sala",

            "falar": () => {

                //Se tem ou não uma "pessoa" na cozinha e se o jogador tem energia para falar;
                if (estadoJogo.pessoa_cozinha && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroCozinha > 0.5) {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde com um sorriso:",
                            "\n'Muito melhor agora'.");

                    } else {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde um pouco aflita:",
                            "\n'Estou melhor'.");

                    }

                } else if (estadoJogo.pessoa_cozinha && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para conversar.");

                } else if (!estadoJogo.pessoa_cozinha) {
                    console.log("Não há ninguém para falar");

                }

            },

            "observar": () => {

                //Se tem ou não uma "pessoa" na cozinha e se o jogador tem energia para observar;
                if (estadoJogo.pessoa_cozinha && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroCozinha > 0.5) {
                        console.log("> Você nota que ela tem unhas sujas, mas roupas limpas.");

                    } else {
                        console.log("> Você nota que ela tem unhas e mãos sujas.");

                    }
                    console.log("! ALERTA: Isso parece humano...?\n");

                } else if (estadoJogo.pessoa_cozinha && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para observar a pessoa.");

                } else if (!estadoJogo.pessoa_cozinha) {
                    console.log("Não há ninguém na cozinha para observar");

                }

            },

            "matar": () => {

                if (estadoJogo.pessoa_cozinha) {

                    //Se for visitante ou não;
                    if (estadoJogo.eMonstroCozinha < 0.5) {
                        console.log("> Você atira na pessoa. Ela cai no chão... morta.",
                            "\nVocê acaba de matar um humano.");
                        estadoJogo.humano_morto++;

                    } else {
                        console.log("> Você atira na pessoa. Ela cai no chão... agoniza e morre, revelando uma forma distorcida.",
                            "\nVocê acaba de matar um monstro.");
                        estadoJogo.visitante_morto++;

                    }
                    estadoJogo.pessoa_cozinha = false;
                    estadoJogo.eMonstroCozinha = 0;

                } else {
                    console.log("Não há pessoas aqui para matar");

                }

            }

        }

    },

    //Definição da Despensa.
    Despensa: {

        descricao: () => {
            console.log(`\n\n${chalk.yellow("[DESPENSA]")}`);
            console.log("Um lugar apertado e cheio de latas velhas.");

            //Se tem ou não uma "pessoa" na despensa;
            if (estadoJogo.pessoa_despensa) {
                console.log("A pessoa está sentada no chão, fazendo uma pilha de latas.");

            } else {
                console.log("Você encara as prateleiras com teias de aranha, latas velhas e poeira... Só há você ali.");

            }

        },

        //Ações possíveis dentro da Despensa;
        conexoes: {

            "sala": () => "Sala",

            "falar": () => {

                //Se tem ou não uma "pessoa" na despensa e se o jogador tem energia para falar;
                if (estadoJogo.pessoa_despensa && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroDespensa > 0.5) {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde, sem levatar a cabeça, te olhando de baixo pra cima:",
                            "\n'Sim, estou só empilhando latas'.");

                    } else {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde, sem levantar a cabeça, te olhando de baixo pra cima:",
                            "\n'Estou, só quero ver quantas latas tem aqui'.");

                    }

                } else if (estadoJogo.pessoa_despensa && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para conversar.");

                } else if (!estadoJogo.pessoa_despensa) {
                    console.log("Não há ninguém na despensa para falar");

                }

            },

            "observar": () => {

                //Se tem ou não uma "pessoa" na despensa e se o jogador tem energia para observar;
                if (estadoJogo.pessoa_despensa && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroDespensa > 0.5) {
                        console.log("> Você nota que ela tem arranhões pelos braços.");

                    } else {
                        console.log("> Você nota que ela tem as unhas bem curtas, parecem roídas.");

                    }

                    console.log("! ALERTA: Isso parece humano...?");

                } else if (estadoJogo.pessoa_despensa && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para observar a pessoa.");

                } else if (!estadoJogo.pessoa_despensa) {
                    console.log("Não há ninguém na despensa para observar");

                }

            },

            "matar": () => {

                if (estadoJogo.pessoa_despensa) {

                    //Se for visitante ou não;
                    if (estadoJogo.eMonstroDespensa < 0.5) {
                        console.log("> Você atira na pessoa. Ela cai no chão... morta.",
                            "\nVocê acaba de matar um humano.");
                        estadoJogo.humano_morto++;

                    } else {
                        console.log("> Você atira na pessoa. Ela cai no chão... agoniza e morre, revelando uma forma distorcida.",
                            "\nVocê acaba de matar um monstro.");
                        estadoJogo.visitante_morto++;

                    }
                    estadoJogo.pessoa_despensa = false;
                    estadoJogo.eMonstroDespensa = 0;

                } else {
                    console.log("Não há ninguém na despensa para matar");

                }

            }

        }

    },

    //Definição do Banheiro;
    Banheiro: {

        descricao: () => {
            console.log(`\n\n${chalk.yellow("[BANHEIRO]")}`);
            console.log("O espelho está embaçado.");

            //Se tem ou não uma "pessoa" no banheiro;
            if (estadoJogo.pessoa_banheiro) {
                console.log("A pessoa está na banheira, ...está nua?");

            } else {
                console.log("Você limpa o espelho e se olha. 'Está tudo bem': Você pensa");

            }

        },

        //Ações possíveis dentro do Banheiro;
        conexoes: {

            "sala": () => "Sala",

            "falar": () => {

                //Se tem ou não uma "pessoa" no banheiro e se o jogador tem energia para falar;
                if (estadoJogo.pessoa_banheiro && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroBanheiro > 0.5) {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde, te olhando com espanto:",
                            "\n'Sim, pode fechar a porta, é que, eu iria banhar'.");

                    } else {
                        console.log("> Você pergunta: 'Tudo bem?'",
                            "\nEla responde, te olhando nos olhos e se levantando calmamente:",
                            "\n'Estou... você quer...'.");
                    }

                } else if (estadoJogo.pessoa_banheiro && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para conversar.");

                } else if (!estadoJogo.pessoa_banheiro) {
                    console.log("Não há ninguém no banheiro para falar");

                }

            },

            "observar": () => {

                //Se tem ou não uma "pessoa" no banheiro e se o jogador tem energia para observar;
                if (estadoJogo.pessoa_banheiro && estadoJogo.energia > 0) {
                    estadoJogo.energia--;

                    if (estadoJogo.eMonstroBanheiro > 0.5) {
                        console.log("> Você nota que ela tem a pele lisa, parece macia.");

                    } else {
                        console.log("> Você nota que ela tem algumas cicatrizes pelo corpo.");

                    }
                    console.log("! ALERTA: Isso parece humano...?");

                } else if (estadoJogo.pessoa_banheiro && estadoJogo.energia <= 0) {
                    console.log("Você está exausto demais para observar a pessoa.");

                } else if (!estadoJogo.pessoa_banheiro) {
                    console.log("Não há ninguém no banheiro para observar");

                }

            },

            "matar": () => {

                if (estadoJogo.pessoa_banheiro) {

                    //Se for visitante ou não;
                    if (estadoJogo.eMonstroBanheiro < 0.5) {
                        console.log("> Você atira na pessoa. Ela cai no chão... morta.",
                            "\nVocê acaba de matar um humano.");
                        estadoJogo.humano_morto++;

                    } else {
                        console.log("> Você atira na pessoa. Ela cai no chão... agoniza e morre, revelando uma forma distorcida.",
                            "\nVocê acaba de matar um monstro.");
                        estadoJogo.visitante_morto++;

                    }
                    estadoJogo.pessoa_banheiro = false;
                    estadoJogo.eMonstroBanheiro = 0;

                } else {
                    console.log("Não há ninguém aqui para matar");

                }

            }

        }

    }
};
return salasJogo;
}