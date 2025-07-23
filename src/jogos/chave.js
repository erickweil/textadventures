//const prompt = require("prompt-sync")();
import { console, prompt, process, rl } from "../mockConsole";

export async function chave() {

let luz = false;
let porta1 = false;
let norteS = false;
let olhar = false;
let chave = false;
let sanidade = 100;
let pressentimento = false;
let musica = false;
let vidaMonstro = 100;
let vidaPersonagem = 100;
let contador = 0;
let tentativa = false;
let lanterna = false;
let achar = false;
let num = Math.floor(Math.random() * 10) + 1;
let foi = false;

const salas = {
    Porta: {
        descricao: () => {
            if (norteS) {
                norteS = false;
                return "Você não consegue abrir essa porta";
            } else if (luz) {
                return "Ao ligar a luz, a sala revela um pouco mais de seus segredos.\n" +
                       "Você observa as paredes desgastadas, o chão úmido e duas portas: uma ao norte e outra ao sul.\n\n" +
                       "No canto direito da sala, algo brilha levemente sob a luz fraca — é uma chave.\n" +
                       "Você se aproxima e a pega. Ela está fria ao toque, um pouco enferrujada, mas parece ainda funcional.\n\n" +
                       "Com a chave em mãos, você se volta novamente para as duas portas.";
            } else {
                if (porta1) {
                    return "É melhor você ligar a luz.";
                } else {
                    return "Você desperta lentamente, deitado no chão frio de uma sala escura e úmida.\n" +
                           "O ar tem um cheiro forte de mofo, e pequenas gotas de água pingam do teto de tempos em tempos.\n\n" +
                           "A luz é quase inexistente, mas o pouco que entra por uma fresta no alto da parede revela paredes manchadas e rachadas.\n" +
                           "Uma dor de cabeça latejante faz você apertar os olhos, tentando se lembrar de como veio parar ali — mas tudo está em branco.\n\n" +
                           "Ao olhar para o lado, você percebe um interruptor enferrujado preso à parede.\n" +
                           "Você quer ligá-lo?\n\n";
                }
            }
        },
        conexoes: {
            "ligar": () => {
                luz = true;
                console.log("Você liga a luz");
                return "Porta";
            },
            "norte": () => {
                if (!chave) {
                    if (!luz) {
                        console.log("Você não consegue ir para o norte, está muito escuro");
                        porta1 = true;
                        return "Porta";
                    } else {
                        norteS = true;
                        return "Porta";
                    }
                } else {
                    return "saida";
                }
            },
            "sul": () => {
                if (!luz) {
                    console.log("Você não consegue ir para o sul, está muito escuro");
                    porta1 = true;
                    return "Porta";
                } else {
                    console.log("Com muito esforço, você consegue abrir a porta");
                    return "sala2";
                }
            }
        }
    },
    saida: {
        descricao: () => {
            return "Com a chave firme em sua mão, você se aproxima da porta imponente marcada com antigos símbolos de encerramento. Ao inseri-la na fechadura, um estalo ecoa por toda a sala — não de ferro se movendo, mas de um ciclo se encerrando.\n\n" +
                       "A porta range lentamente ao se abrir, revelando uma luz dourada que inunda o corredor escuro. O ar que passa por você é morno, calmo… diferente de tudo que enfrentou até agora. É a brisa da liberdade.\n\n" +
                       "Você deu cada passo com coragem. Sobreviveu a horrores, venceu monstros, resistiu às trevas e aos próprios medos.\n\n" +
                       "*Parabéns! Você encontrou a chave, desvendou o caminho e conquistou sua liberdade.*\n\n" +
                       "A jornada foi dura, mas agora... você é livre. \n\nDeseja jogar novamente?";
        },
        conexoes: {
            "sim": () => {
                luz = false;
                porta1 = false;
                norteS = false;
                olhar = false;
                chave = false;
                sanidade = 100;
                pressentimento = false;
                musica = false;
                vidaMonstro = 100;
                vidaPersonagem = 100;
                contador = 0;
                tentativa = false;
                lanterna = false;
                achar = false;
                num = Math.floor(Math.random() * 10) + 1;
                foi = false;
                return "Porta";
            },
            "sair": () => {
                console.log("Obrigado por jogar!");
                return process.exit();
            }
        }
    },
    sala2: {
        descricao: () => {
            if (olhar) {
                return `Você sente um medo terrivel, senti que sua sanidade diminuiu, mas não vê mais nada, é melhor seguir em frente\n**sanidade = ${sanidade}`;
            } else {
                return "Você entra em uma nova sala, onde o cheiro é ainda mais desagradável do que na anterior.\n" +
                       "A luz da sala está instável, piscando constantemente — ora iluminando os cantos, ora mergulhando tudo na escuridão.\n\n" +
                       "Um arrepio percorre sua espinha enquanto seus olhos se adaptam ao ambiente estranho.\n\n" +
                       "Diante de você, há duas portas:\n" +
                       "A porta ao sul está cheia de arranhões profundos, como se alguma criatura tivesse tentado forçá-la.\n" +
                       "Já a porta a leste está entreaberta..\n\n" +
                       "Antes que você faça a sua escolha, você ouve um barulho na porta em que você entrou.";
            }
        },
        conexoes: {
            "norte": () => "Porta",
            "sul": () => "sala3",
            "leste": () => "sala6",
            "olhar": () => {
                if (olhar) {
                    return "sala2";
                } else {
                    sanidade = Math.max(0, sanidade - 30);
                    olhar = true;
                    console.log("Você ve um vulto preto, que desaparece quando a luz apaga e depois que acende vocÊ não ve mais nada");
                    return "sala2";
                }
            }
        }
    },
    sala3: {
        descricao: () => {
            if (musica == true && foi == true) {
                return "Você coloca o disco para tocar e, surpreendentemente, uma música calma e relaxante começa a tocar.\n" +
                       "A melodia suaviza seus pensamentos, acalmando sua mente e fazendo você esquecer, por alguns instantes, a tensão daquela situação.\n\n" +
                       "Você se senta em uma das poltronas — velha, suja, mas naquele momento, estranhamente confortável.\n" +
                       "É como se a sala lhe oferecesse uma breve trégua.\n\n" +
                       "+10 de sanidade\n" +
                       "Sanidade atual: " + sanidade;
            }
            return "Nesta sala, você encontra poltronas antigas cobertas por grossas camadas de poeira.\n" +
                       "O ambiente é silencioso, e tudo parece intocado há muito tempo.\n\n" +
                       "À sua frente, sobre uma mesa empoeirada, há um disco de vinil.\n" +
                       "A capa está desgastada, mas o que mais chama sua atenção é o símbolo estranho e medonho estampado no centro do disco.\n\n" +
                       "Você sente um misto de curiosidade e receio.\n" +
                       "Algo dentro de você quer ouvir o que está gravado ali...\n" +
                       "Mas uma parte hesita, como se soubesse que talvez não devesse.\n\n";
        },
        conexoes: {
            "norte": () => "sala2",
            "leste": () => "sala8",
            "oeste": () => "sala4",
            "sul": () => "sala5",
            "ligar": () => {
                if (musica) {
                    console.log("A música já está tocando.");
                    return "sala3";
                } else if (!foi) {
                    console.log("Você coloca o disco no vinil.");
                    sanidade = Math.min(100, sanidade + 10);
                    musica = true;
                    foi = true;
                    return "sala3";
                } else {
                    console.log("Você coloca o disco no vinil, mas ele não surte mais efeito em você...");
                    musica = true;
                    return "sala3";
                }
            }
        }
    },
    sala6: {
        descricao: () => {
            if (pressentimento) {
                return "você pode ir para leste, mesmo ignorando seu pressentimento";
            } else {
                return "Você entra na sala. Esta parece diferente das anteriores.\n" +
                       "Pela primeira vez, você sente uma estranha sensação de segurança.\n" +
                       "O ar é limpo e tranquilo, mas a sala está completamente vazia.\n\n" +
                       "No centro do ambiente, repousa um baú antigo.\n" +
                       "Sem muita dificuldade, você o abre e, para sua surpresa, encontra uma *espada reluzente* em seu interior.\n\n" +
                       "Sem hesitar, você a pega. Ela parece leve, mas afiada.\n\n" +
                       "No fundo do baú, há uma inscrição entalhada na madeira:\n" +
                       "\"Cuidado com o que está por vir... Torça para não precisar usar a espada. Nessa sala também há 4 portas incluindo a porta em que você entrou\"\n";
            }
        },
        conexoes: {
            "norte": () => {
                if (pressentimento) {
                    return "sala9";
                } else {
                    console.log("Você sente que ir para essa porta pode ser perigoso e que sua sanidade pode abaixar mais ainda");
                    pressentimento = true;
                    return "sala6";
                }
            },
            "oeste": () => "sala2",
            "leste": () => "sala7",
            "sul": () => "sala8"
        }
    },
    sala9: {
        descricao: () => {
            if (tentativa) {
                return "Está vazia....";
            } else {
                if (achar) {
                    return "Você achou uma lanterna.";
                }
                return "Você entra em uma sala abafada, o calor é quase insuportável.\n" +
                       "O ar é pesado e faz com que cada respiração pareça mais difícil.\n\n" +
                       "A sala está cheia de caixas empilhadas por todos os cantos — grandes, pequenas, todas cobertas de poeira.\n" +
                       "Não há mais nada ali, apenas caixas… e a curiosidade sobre o que pode estar dentro delas.\n\n" +
                       "Você deseja abrir algumas para investigar?\n\n";
            }
        },
        conexoes: {
            "abrir": () => {
                if (achar) {
                    console.log("Você já achou a lanterna. As outras caixas estão vazias.");
                    return "sala9";
                }

                contador++;
                tentativa = true;

                if (contador === num) {
                    achar = true;
                    lanterna = true;
                    tentativa = false;
                    return "sala9";
                } else {
                    if (contador === 6) {
                        sanidade = Math.max(0, sanidade - 20);
                        console.log("Você fica cansado de procurar e perde 20 de sanidade\n sanidade atual: " + sanidade);
                    }
                    return "sala9";
                }
            },
            "sul": () => "sala6"
        }
    },
    sala7: {
        descricao: () => {
            return "Ao abrir levemente a porta, um rugido assombroso ecoa do outro lado, fazendo o chão vibrar sob seus pés.\n" +
                       "Movido por uma mistura de coragem e imprudência, você empurra a porta por completo — e o que vê congela seu sangue.\n\n" +
                       "Diante de você está uma criatura imensa, de pele negra como carvão, com olhos brilhando em um vermelho profundo.\n" +
                       "Seu corpo é retorcido e coberto por veias pulsantes. Os braços longos terminam em garras afiadas, e seus dentes parecem serras prontas para dilacerar.\n\n" +
                       "Ele o encara com fome no olhar. Antes que você consiga sequer reagir com um grito, uma cadeira voa em sua direção com força brutal!\n\n" +
                       "O que você faz?\n\n";
        },
        conexoes: {
            "desviar": () => {
                console.log("Você consegue desviar da cadeira lançada com precisão e, encorajado, avança com a espada em punho.\n" +
                            "Em um movimento rápido, golpeia o braço do monstro, causando um corte profundo.\n" +
                            "A criatura recua, soltando um rugido de dor — você causou 10 de dano.\n\n");
                vidaMonstro -= 10;
                return "luta2";
            },
            "bloquear com a espada": () => {
                console.log("Você bloqueia por pouco cortando a cadeira no meio, encorajado, avança com a espada em punho.\n" +
                            "Em um movimento rápido, golpeia a perna do monstro, causando um corte superficial.\n" +
                            "A criatura recua, soltando um rugido de dor — você causou 5 de dano.\n\n");
                vidaMonstro -= 5;
                return "luta2";
            },
            "fugir": () => {
                console.log("Você tenta fugir, mas a porta se fecha com um estrondo bem na hora, trancando você dentro da sala.\n" +
                            "Sem tempo para escapar, é atingido pela cadeira no ombro e cai no chão.\n\n" +
                            "-20 de sanidade\n\n" +
                            "Ainda atordoado, você se levanta com a espada em mãos. Agora, não há outra escolha...\n" +
                            "Você precisa lutar.");
                sanidade = Math.max(0, sanidade - 20);
                return "luta1";
            }
        }
    },
    luta1: {
        descricao: () => {
            return "Mas o que você vê em seguida o faz se arrepender instantaneamente de não ter fugido enquanto pôde.\n" +
                       "O monstro se enfurece. Seus músculos se contraem, os olhos brilham com ódio, e ele avança com violência.\n\n" +
                       "Você tenta se defender com a espada, mas o impacto do golpe é tão forte que seus braços quase cedem. A lâmina treme.\n" +
                       "Está prestes a quebrar... você só tem 2 opcoes:\n desistir - se entregar e morrer ali de forma ridícula\n";
        },
        conexoes: {
            "desistir": () => "perdeu",
            "continuar": () => {
                return "luta2";
            }
        }
    },
    luta2: {
        descricao: () => {
            return "De repente, um som ecoa do metal — grave, ancestral, como se algo despertasse.\n\n" +
                       "Uma onda de energia azulada explode da espada, lançando o monstro contra a parede com brutalidade.\n" +
                       "Você cai de joelhos, ofegante, e observa a lâmina em suas mãos.\n" +
                       "Ela agora está maior, com detalhes místicos esculpidos por toda a extensão e envolta por um intenso brilho azul.\n" +
                       "Você sente um calor reconfortante na palma da mão.\n\n" +
                       "Na base da lâmina, há uma inscrição brilhando em letras antigas: Espada de Eryndor — forjada pelos Guardiões da Luz no tempo antes do tempo, entregue apenas àqueles que enfrentam a escuridão com coragem verdadeira.\n\n" +
                       "Sem hesitar, você parte para cima do monstro.\n" +
                       "Com precisão e poder recém-descobertos, desfere três golpes avassaladores.\n" +
                       "O som dos cortes ecoa pela sala como trovões, e a criatura ruge em desespero, cambaleando...\n\n" +
                       "A maré da batalha virou.\n ATENÇÃO\nAgora é batalha direta, dano do monstro versus seu dano. SE PREPARE!";
        },
        conexoes: {
            "lutar": () => {
                return "lutaDanoPersonagem";
            }
        }
    },
    lutaDanoMonstro: {
        descricao: () => {
            if (vidaMonstro <= 0) {
                return "O monstro cai ao chão, derrotado. O silêncio preenche a sala — você venceu.\n\n" +
                       "Parabéns! Sua coragem e força o trouxeram até aqui.\n\n" +
                       "Mas a jornada ainda não acabou...\n" +
                       "Siga em frente e encontre a chave. O destino aguarda.\n";
            }
            let danoMonstro = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            vidaPersonagem -= danoMonstro;
            vidaPersonagem = Math.max(0, vidaPersonagem);

            if (vidaPersonagem <= 0) {
                return "O golpe final atravessa sua defesa. Seu corpo cai sem forças...\n" +
                       "A escuridão te envolve.\n\n" +
                       "Você foi derrotado pelo monstro.";
            }

            if (danoMonstro > 10 && danoMonstro < 20) {
                return "O monstro avança e desfere um golpe leve com suas garras. Você sente a dor se espalhar rapidamente pelo braço, sofrendo " +
                       danoMonstro + " de dano. Sua vida agora é " + vidaPersonagem + ".";
            } else if (danoMonstro >= 20 && danoMonstro < 35) {
                return "Com um rugido feroz, o monstro o atinge com força no peito, derrubando você no chão. A dor é intensa — você sofreu " +
                       danoMonstro + " de dano. Sua vida agora é " + vidaPersonagem + ".";
            } else {
                return "O golpe é brutal. As garras do monstro atravessam sua defesa, rasgando parte de sua carne. Você sofre " +
                       danoMonstro + " de dano. Sua vida agora é " + vidaPersonagem + ".";
            }
        },
        conexoes: {
            "continuar": () => {
                if (vidaPersonagem <= 0) {
                    return "perdeu";
                }
                if (vidaMonstro <= 0) {
                    return "sala5";
                }
                return "lutaDanoPersonagem";
            }
        }
    },
    lutaDanoPersonagem: {
        descricao: () => {
            if (vidaPersonagem <= 0) {
                return "O golpe final atravessa sua defesa. Seu corpo cai sem forças...\n" +
                       "A escuridão te envolve.\n\n" +
                       "Você foi derrotado pelo monstro.";
            }
            let danoPersonagem = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            vidaMonstro -= danoPersonagem;
            vidaMonstro = Math.max(0, vidaMonstro);

            if (vidaMonstro <= 0) {
                return "O golpe atinge em cheio! A criatura urra em agonia, gravemente ferida. Causando " +
                       danoPersonagem + " de dano. A vida do monstro agora é de " + vidaMonstro + ".\n" +
                       "O monstro cai ao chão, derrotado. O silêncio preenche a sala — você venceu.\n\n" +
                       "Parabéns! Sua coragem e força o trouxeram até aqui.\n\n" +
                       "Mas a jornada ainda não acabou...\n" +
                       "Siga em frente e encontre a chave. O destino aguarda.\n";
            }

            if (danoPersonagem > 10 && danoPersonagem < 20) {
                return "O ataque acerta de raspão, causando um ferimento leve na criatura. Causando " +
                       danoPersonagem + " de dano. A vida do monstro agora é de " + vidaMonstro + ".";
            } else if (danoPersonagem >= 20 && danoPersonagem < 35) {
                return "A lâmina rasga parte do corpo da criatura, fazendo-a recuar com dor. Causando " +
                       danoPersonagem + " de dano. A vida do monstro agora é de " + vidaMonstro + ".";
            } else {
                return "O golpe atinge em cheio! A criatura urra em agonia, gravemente ferida. Causando " +
                       danoPersonagem + " de dano. A vida do monstro agora é de " + vidaMonstro + ".";
            }
        },
        conexoes: {
            "continuar": () => {
                if (vidaMonstro <= 0) {
                    return "sala5";
                }
                if (vidaPersonagem <= 0) {
                    return "perdeu";
                }
                return "lutaDanoMonstro";
            }
        }
    },
    sala8: {
        descricao: () => {
            return "Você entra em uma sala envolta por penumbra, onde o ar é denso e carregado de umidade.\n" +
                       "As paredes estão cobertas por musgo e rachaduras, e o chão range sob seus passos como se não fosse pisado há anos.\n\n" +
                       "De repente, um ruído grave e arrastado ecoa pela sala — um rosnado profundo, vindo de algum lugar não muito distante.\n" +
                       "Seu instinto se alerta. Algo está à espreita nas sombras.";
        },
        conexoes: {
            "norte": () => "sala6",
            "leste": () => "sala7",
            "oeste": () => "sala3"
        }
    },
    sala4: {
        descricao: () => {
            if (vidaMonstro > 0 && !lanterna) {
                console.log("Incapaz de enxergar no breu total, você pisa em falso e ativa uma armadilha oculta.\n" +
                            "Um mecanismo se ativa sob seus pés e, antes que possa reagir, seu corpo é lançado violentamente para trás.\n\n" +
                            "A caída é brusca, e sua mente gira em confusão — você perde 40 de sanidade.\n" +
                            "Quando se dá conta, está de volta à sala anterior... desorientado e abalado.");
                sanidade = Math.max(0, sanidade - 40);
                return "sala3";
            } else {
                return "Você entra em uma nova sala, fresca e que você se sente seguro. Ao sul, destaca-se uma porta onde parece ser o caminho para sua escapatória";
            }
        },
        conexoes: {
            "voltar": () => "sala3",
            "continuar": () => {
                if (vidaMonstro <= 0 || lanterna === true) {
                    return "salachave";
                } else {
                    console.log("Você não consegue continuar neste caminho sem a luz ou sem ter derrotado o perigo.");
                    sanidade = Math.max(0, sanidade - 40);
                    return "sala3";
                }
            }
        }
    },
    sala5: {
        descricao: () => {
            if (vidaMonstro <= 0) {
                vidaPersonagem = 100;
                sanidade = 100;
                return "Após derrotar o monstro, uma onda de energia percorre seu corpo — você se sente vivo novamente.\n" +
                       "A espada emite um brilho suave e, como se reconhecesse sua vitória, restaura completamente sua vida e sanidade.\n\n" +
                       "Revigorado, você avança até uma nova sala. A oeste, destaca-se uma porta onde parece ser o caminho para sua escapatória";
            } else if (lanterna == true) {
                return "Com a lanterna ligada você avança até uma nova sala. A oeste, destaca-se uma porta onde parece ser o caminho para sua escapatória";
            } else {
                console.log("Incapaz de enxergar no breu total, você pisa em falso e ativa uma armadilha oculta.\n" +
                            "Um mecanismo se ativa sob seus pés e, antes que possa reagir, seu corpo é lançado violentamente para trás.\n\n" +
                            "A caída é brusca, e sua mente gira em confusão — você perde 40 de sanidade.\n" +
                            "Quando se dá conta, está de volta à sala anterior... desorientado e abalado.");
                sanidade = Math.max(0, sanidade - 40);
                return "sala3";
            }
        },
        conexoes: {
            "norte": () => "sala3",
            "entrar": () => {
                if (vidaMonstro <= 0 || lanterna === true) {
                    return "salachave";
                } else {
                    console.log("Você não consegue entrar neste caminho sem a luz ou sem ter derrotado o perigo.");
                    sanidade = Math.max(0, sanidade - 40);
                    return "sala3";
                }
            }
        }
    },
    salachave: {
        descricao: () => {
            chave = true;
            return "Você adentra uma sala silenciosa e coberta de poeira, iluminada apenas por uma fenda no teto que projeta um feixe de luz sobre o centro do cômodo.\n\n" +
                       "Ali, sobre um altar de pedra coberto por inscrições antigas, repousa uma *chave de ferro escuro* com símbolos esculpidos em espiral.\n" +
                       "Logo atrás do altar, uma parede apresenta um antigo mural desbotado, mas ainda legível:\n\n" +
                       "Um traçado marcado com linhas e setas indica uma rota: *Leste → Norte → Norte → Norte → Norte.*\n\n" +
                       "Você entende: esta é a chave da saída — e o caminho final foi revelado.\n" +
                       "Agora, só resta segui-lo.";
        },
        conexoes: {
            "norte": () => "sala4",
            "leste": () => "sala5"
        }
    },
    perdeu: {
        descricao: () => {
            return "*Game Over.*\nSua jornada termina aqui. Deseja jogar novamente?";
        },
        conexoes: {
            "sim": () => {
                luz = false;
                porta1 = false;
                norteS = false;
                olhar = false;
                chave = false;
                sanidade = 100;
                pressentimento = false;
                musica = false;
                vidaMonstro = 100;
                vidaPersonagem = 100;
                contador = 0;
                tentativa = false;
                lanterna = false;
                achar = false;
                num = Math.floor(Math.random() * 10) + 1;
                foi = false;
                return "Porta";
            },
            "sair": () => {
                console.log("Obrigado por jogar!");
                return process.exit();
            }
        }
    }
};

let salaAtual = salas["Porta"];

while (true) {
    console.clear();
    console.log(salaAtual.descricao());

    for (const comandoPossivel in salaAtual.conexoes) {
        console.log("-", comandoPossivel);
    }

    const comando = (await prompt(">")).toLowerCase().trim();

    if (!comando) {
        console.log("Por favor, digite um comando.");
        continue;
    }

    const proximaSalaOuAcao = salaAtual.conexoes[comando];

    if (proximaSalaOuAcao) {
        const resultado = proximaSalaOuAcao();
        if (typeof resultado === 'string') {
            if (salas[resultado]) {
                salaAtual = salas[resultado];
            } else {
                console.log("Ocorreu um erro no jogo: Destino de sala inválido.");
                break;
            }
        }
    } else {
        console.log("Não pode ir para lá ou o comando é inválido. Tente uma das opções listadas.");
    }

    if (sanidade <= 0) {
        console.log("\n*Sua sanidade chegou ao limite... Você não consegue mais distinguir realidade da ilusão.*");
        salaAtual = salas["perdeu"];
        console.log(salaAtual.descricao());
        for (const comandoPossivel in salaAtual.conexoes) {
            console.log("-", comandoPossivel);
        }
        const comandoPerdeu = await prompt(">");
        if (comandoPerdeu.toLowerCase().trim() === "sim") {
            salaAtual = salas[salaAtual.conexoes["sim"]()];
        } else {
            salaAtual.conexoes["sair"]();
        }
    }
}

}