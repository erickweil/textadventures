//import { createInterface } from 'node:readline/promises';

import { console, prompt, process, rlPromises as term } from "../mockConsole";
import { getChalk } from "../utils/chalk";

export async function quemEstaLa() {
let chalk = getChalk(true);
/*const term = createInterface({
    input: process.stdin,
    output: process.stdout
});*/

let salaAtual = "Corredor";
let inventario = [];
let portaSotaoAberta = false;
let espelhoQuebrado = false;
let espelhoExaminado = false;
let caixaMusicaAtivada = false;
let gatinhoAlimentado = false;
let monstroViu = 0;

const tem = (item) => inventario.includes(item);

const itensInfantis = ["ursinho", "carrinhos", "diario", "foto", "fita"];

function pegar(item, sala) {
    if (tem(item)) {
        console.log(chalk.yellow(`Você já tem o ${item}.`));
        return;
    }
    inventario.push(item);
    salas[sala].itens = salas[sala].itens.filter(i => i !== item);
    console.log(chalk.green(`Você pegou: ${item}.`));
}

function monstroAparece(local) {
    const falas = [
        "👁  De algum lugar escuro, você ouve choro de criança. Perto. Muito perto.",
        "👁  Uma sombra pequena desliza pelo corredor. Passos descalços no assoalho.",
        `👁  Uma voz infantil sussurra: "Por que você me abandonou?" ela está em ${local}.`,
        "👁  O choro para. Isso é pior.",
    ];
    console.log(chalk.bold.red("\n" + falas[Math.min(monstroViu, falas.length - 1)]));
    monstroViu++;
}

function mostrarInventario() {
    if (inventario.length === 0) {
        console.log(chalk.dim("Inventário vazio."));
    } else {
        console.log(chalk.cyan("Você carrega: " + inventario.join(", ")));
    }
}

function cenarioDerrota(item) {
    console.log(chalk.bold.red(`
╔══════════════════════════════════════════════════════╗
║              ELE TE ENCONTROU                        ║
╚══════════════════════════════════════════════════════╝`));
    console.log(chalk.white(`
Você recua do ${item} e decide que não vale a pena lembrar.`));
    console.log(chalk.red(`
Uma risada infantil ecoa pela casa. Passos descalços no corredor.
A figura pequena aparece na soleira da porta.
Ela te olha com seus olhos fundos os mesmos olhos que eram seus.`));
    console.log(chalk.magenta(`
"Você tentou me enterrar. Mas crianças não morrem assim."`));
    console.log(chalk.white(`
A escuridão engole tudo.
Você acorda mas algo dentro de você não acorda junto.`));
    console.log(chalk.bold.red(`
╔════════════════════════════════════╗
║   FIM CONSUMIDO PELO ESQUECIMENTO  ║
╚════════════════════════════════════╝
`));
    term.close();
    process.exit(0);
}

function tentarEncarar() {
    const faltam = itensInfantis.filter(i => !tem(i));
    if (faltam.length > 0) {
        console.log(chalk.dim("Você abre a boca mas as palavras não saem."));
        console.log(chalk.red("Faltam memórias: " + faltam.join(", ")));
    } else {
        vitoria();
    }
}

function vitoria() {
    console.log(chalk.bold.magenta(`
╔══════════════════════════════════════════════════════╗
║          A CRIANÇA FINALMENTE VIRA PARA VOCÊ         ║
╚══════════════════════════════════════════════════════╝`));
    console.log(chalk.white(`
O rosto dela é o seu. Sete anos, olhos vermelhos de tanto chorar.

Você se ajoelha. Coloca no chão, um por um, cada item que coletou:
o ursinho. os carrinhos. o diário. a foto. a fita cassete.

Ela olha para os objetos. Depois olha para você.`));
    console.log(chalk.cyan(`
"Você se lembrou de mim."`));
    console.log(chalk.white(`
Não é uma acusação. É alívio.

Você abre os braços. Ela hesita então vem.

No momento em que você a abraça, a casa para de ranger.
O choro sumiu. A escuridão recua.

No bolso, você encontra uma mensagem escrita em letra de criança:`));
    console.log(chalk.yellow(`
"Crescer não significa me abandonar. Obrigado por voltar."`));
    console.log(chalk.bold.green(`
╔════════════════════════════════════╗
║   FIM A CRIANÇA INTERIOR LIVRE     ║
╚════════════════════════════════════╝
`));
    term.close();
    process.exit(0);
}

const salas = {
    Corredor: {
        itens: ["ursinho"],
        descricao: () => {
            console.log(chalk.white("Um corredor longo e escuro. O papel de parede descasca em tiras,"));
            console.log(chalk.white("revelando rabiscos de criança por baixo desenhos de casinhas e sóis."));
            if (salas.Corredor.itens.includes("ursinho")) {
                console.log(chalk.yellow("No canto, um URSINHO DE PELÚCIA surrado observa você com um olho só."));
            }
        },
        conexoes: {
            "norte": () => "SalaJantar",
            "sul": () => "Entrada",
            "leste": () => "Banheiro",
            "pegar ursinho": () => { pegar("ursinho", "Corredor"); },
            "ignorar": (arg) => {
                if (tem("ursinho")) {
                    console.log(chalk.yellow("Você já pegou o ursinho."));
                    return;
                }
                if (arg === "ursinho" || !arg) cenarioDerrota("ursinho");
                else console.log(chalk.dim("Ignorar o quê?"));
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Entrada: {
        itens: ["foto"],
        descricao: () => {
            console.log(chalk.white("A porta da frente está trancada por fora. Não tem saída por aqui."));
            console.log(chalk.white("Molduras de fotos foram todas viradas de cabeça para baixo."));
            if (salas.Entrada.itens.includes("foto")) {
                console.log(chalk.yellow("Uma FOTO caiu no chão, com o rosto virado para cima."));
            }
        },
        conexoes: {
            "norte": () => "Corredor",
            "pegar foto": () => { pegar("foto", "Entrada"); },
            "ignorar": (arg) => {
                if (tem("foto")) {
                    console.log(chalk.yellow("Você já pegou a foto."));
                    return;
                }
                if (arg === "foto" || !arg) cenarioDerrota("foto");
                else console.log(chalk.dim("Ignorar o quê?"));
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Banheiro: {
        itens: [],
        descricao: () => {
            console.log(chalk.white("Um banheiro velho com azulejos rachados."));
            if (espelhoQuebrado) {
                console.log(chalk.gray("Cacos do espelho espalhados pelo chão refletem sua imagem em pedaços."));
            } else {
                console.log(chalk.white("O espelho sobre a pia está coberto por um lençol que balança sem vento."));
            }
        },
        conexoes: {
            "oeste": () => "Corredor",
            "examinar espelho": () => {
                if (espelhoQuebrado) {
                    console.log(chalk.gray("Os cacos mostram seu rosto fragmentado. Em um deles, uma criança chorando."));
                } else if (!espelhoExaminado) {
                    espelhoExaminado = true;
                    console.log(chalk.white("Você puxa o lençol. O espelho mostra seu reflexo com alguns segundos de atraso."));
                    console.log(chalk.red("Então o reflexo sorri. Você não sorriu."));
                    monstroAparece("banheiro");
                } else {
                    console.log(chalk.white("Você evita olhar diretamente para o espelho."));
                }
            },
            "quebrar espelho": () => {
                if (espelhoQuebrado) {
                    console.log(chalk.yellow("O espelho já está quebrado."));
                } else {
                    espelhoQuebrado = true;
                    console.log(chalk.green("Você quebra o espelho. A sensação de ser observado diminui um pouco."));
                }
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    SalaJantar: {
        itens: ["carrinhos"],
        descricao: () => {
            console.log(chalk.white("Uma mesa longa com pratos de comida apodrecida. Uma cadeira está virada."));
            if (salas.SalaJantar.itens.includes("carrinhos")) {
                console.log(chalk.yellow("Três CARRINHOS DE BRINQUEDO enfileirados sob a mesa, guardados com cuidado."));
            }
            if (monstroViu > 0 && monstroViu < 3) {
                console.log(chalk.red("Uma das cadeiras se moveu desde a última vez que você esteve aqui."));
            }
        },
        conexoes: {
            "sul": () => "Corredor",
            "norte": () => "Cozinha",
            "leste": () => "SalaEstar",
            "pegar carrinhos": () => { pegar("carrinhos", "SalaJantar"); },
            "ignorar": (arg) => {
                if (tem("carrinhos")) {
                    console.log(chalk.yellow("Você já pegou os carrinhos."));
                    return;
                }
                if (arg === "carrinhos" || !arg) cenarioDerrota("carrinhos");
                else console.log(chalk.dim("Ignorar o quê?"));
            },
            "examinar mesa": () => {
                console.log(chalk.white("No centro da mesa, um lugar tem um prato limpo com um copo de leite fresco."));
                console.log(chalk.red("Ainda quentinho."));
                monstroAparece("sala de jantar");
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Cozinha: {
        itens: [],
        descricao: () => {
            console.log(chalk.white("Uma cozinha caótica. Gavetas abertas, panelas no chão."));
            if (gatinhoAlimentado) {
                console.log(chalk.green("Um gatinho malhado dorme no canto, ronronando satisfeito."));
            } else {
                console.log(chalk.yellow("Um gatinho malhado faminto mia desesperadamente."));
            }
        },
        conexoes: {
            "sul": () => "SalaJantar",
            "oeste": () => "Despensa",
            "alimentar gato": () => {
                if (gatinhoAlimentado) {
                    console.log(chalk.yellow("O gatinho já está satisfeito."));
                } else if (!tem("sardinha")) {
                    console.log(chalk.dim("O gatinho mia mas você não tem nada para dar. Procure comida."));
                } else {
                    gatinhoAlimentado = true;
                    console.log(chalk.green("Você dá a sardinha ao gatinho. Ele ronrona e se deita deve ser o Bolinha."));
                }
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Despensa: {
        itens: ["sardinha", "fita"],
        descricao: () => {
            console.log(chalk.white("Uma despensa apertada com prateleiras de madeira. Cheira a mofo."));
            if (salas.Despensa.itens.includes("sardinha")) {
                console.log(chalk.yellow("Uma lata de SARDINHA ainda fechada no canto da prateleira."));
            }
            if (salas.Despensa.itens.includes("fita")) {
                console.log(chalk.yellow('Uma FITA CASSETE rotulada com letra de criança: "Minhas músicas NÃO MEXA".'));
            }
        },
        conexoes: {
            "leste": () => "Cozinha",
            "pegar sardinha": () => { pegar("sardinha", "Despensa"); },
            "pegar fita": () => { pegar("fita", "Despensa"); },
            "ignorar": (arg) => {
                if (tem("fita")) {
                    console.log(chalk.yellow("Você já pegou a fita."));
                    return;
                }
                if (arg === "fita" || !arg) cenarioDerrota("fita");
                else console.log(chalk.dim("Ignorar o quê?"));
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    SalaEstar: {
        itens: ["diario"],
        descricao: () => {
            console.log(chalk.white("Uma sala com sofá de couro rachado e uma televisão antiga desligada."));
            if (caixaMusicaAtivada) {
                console.log(chalk.magenta("A caixa de música toca uma melodia infantil. O ar parece menos hostil."));
            } else {
                console.log(chalk.white("Uma caixa de música sobre a lareira apagada está fechada."));
            }
            if (salas.SalaEstar.itens.includes("diario")) {
                console.log(chalk.yellow("Um DIÁRIO com capa de girassol está enfiado entre as almofadas do sofá."));
            }
        },
        conexoes: {
            "oeste": () => "SalaJantar",
            "norte": () => "Escritorio",
            "abrir caixa": () => {
                if (caixaMusicaAtivada) {
                    console.log(chalk.yellow("A caixa de música já está tocando."));
                } else {
                    caixaMusicaAtivada = true;
                    console.log(chalk.magenta("Você abre a caixa de música. Uma melodia de ninar ecoa pela casa simples e triste."));
                    console.log(chalk.magenta("Por um momento, o choro distante para."));
                }
            },
            "examinar tv": () => {
                console.log(chalk.white("A TV está desligada mas o ecrã reflete uma figura pequena atrás de você."));
                console.log(chalk.red("Você vira rápido. Nada."));
                monstroAparece("sala de estar");
            },
            "pegar diario": () => { pegar("diario", "SalaEstar"); },
            "ignorar": (arg) => {
                if (tem("diario")) {
                    console.log(chalk.yellow("Você já pegou o diário."));
                    return;
                }
                if (arg === "diario" || !arg) cenarioDerrota("diario");
                else console.log(chalk.dim("Ignorar o quê?"));
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Escritorio: {
        itens: [],
        descricao: () => {
            console.log(chalk.white("Um escritório com escrivaninha entupida de papéis. Um toca-fitas antigo sobre a mesa."));
            if (!caixaMusicaAtivada) {
                console.log(chalk.dim("Sem a música da caixa, o silêncio aqui é sufocante."));
            }
        },
        conexoes: {
            "sul": () => "SalaEstar",
            "norte": () => "EscadaSotao",
            "usar fita": () => {
                if (!tem("fita")) {
                    console.log(chalk.dim("Você não tem uma fita para colocar."));
                } else {
                    console.log(chalk.white("Você coloca a fita no toca-fitas. A voz de uma criança preenche o quarto cantando feliz."));
                    console.log(chalk.white('No verso da caixa há um bilhete: "O sótão só abre para quem lembra."'));
                    console.log(chalk.bold.yellow("Abaixo, um código rabiscado: BOLINHA"));
                }
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    EscadaSotao: {
        itens: [],
        descricao: () => {
            console.log(chalk.white("Uma escada íngreme de madeira que range horrivelmente."));
            if (portaSotaoAberta) {
                console.log(chalk.green("A porta do sótão está ABERTA."));
            } else {
                console.log(chalk.white("No topo, uma porta com trava de combinação seis letras."));
            }
        },
        conexoes: {
            "sul": () => "Escritorio",
            "norte": () => {
                if (portaSotaoAberta) {
                    return "Sotao";
                } else {
                    console.log(chalk.dim("A porta está trancada. Você precisa digitar o código."));
                    return null;
                }
            },
            "digitar": (arg) => {
                if (arg === "bolinha") {
                    if (portaSotaoAberta) {
                        console.log(chalk.yellow("A porta já está aberta."));
                    } else {
                        portaSotaoAberta = true;
                        console.log(chalk.green("Os mecanismos clicam. A trava se abre. A porta do sótão range ao ceder."));
                    }
                } else {
                    console.log(chalk.dim(`"${arg}" não é o código certo.`));
                }
            },
            "inventario": () => { mostrarInventario(); },
        }
    },

    Sotao: {
        itens: [],
        descricao: () => {
            console.log(chalk.white("Um sótão com telhado baixo e vigas expostas. Luz de lua entra por uma claraboia."));
            console.log(chalk.white("No centro, uma figura pequena está de costas para você os ombros tremem."));
            const faltam = itensInfantis.filter(i => !tem(i));
            if (faltam.length > 0) {
                console.log(chalk.red("Você sente que não está pronto. Faltam memórias: " + faltam.join(", ")));
            } else {
                console.log(chalk.magenta("Você carrega tudo que precisa. É hora de encarar."));
            }
        },
        conexoes: {
            "sul": () => "EscadaSotao",
            "falar":   () => { tentarEncarar(); },
            "encarar": () => { tentarEncarar(); },
            "abracar": () => { tentarEncarar(); },
            "inventario": () => { mostrarInventario(); },
        }
    },
};

console.clear();
console.log(chalk.bold.red(`
╔══════════════════════════════════════════════════════╗
║          Q U E M   E S T Á   L Á ?                   ║
║          Uma Aventura de Terror                      ║
╚══════════════════════════════════════════════════════╝`));
console.log(chalk.white(`
Você acorda em uma casa que você não reconhece mas que,
de alguma forma, reconhece você.

Paredes com desenhos de criança. Brinquedos abandonados.
E em algum lugar da escuridão, algo chora.

Você não sabe o que é. Mas sente que precisa descobrir.
`));

while (true) {
    const sala = salas[salaAtual];
    if (!sala) {
        console.log(chalk.red("Caiu para fora do mundo!"));
        break;
    }

    console.log();
    sala.descricao();
    console.log(chalk.dim("---"));
    for (const chave in sala.conexoes) {
        console.log(chalk.dim("- " + chave));
    }

    const comando = await term.question(chalk.bold.red("> "));
    if (!comando) break;

    const comandoLimpo = comando.trim().toLowerCase();
    const [verbo, ...args] = comandoLimpo.split(" ");
    const argumento = args.join(" ");

    const acao = sala.conexoes[comando.trim()] || sala.conexoes[comandoLimpo] || sala.conexoes[verbo];

    if (acao) {
        const destino = acao(argumento);
        if (destino) {
            salaAtual = destino;
        }
    } else {
        console.log(chalk.gray(`Comando inválido: "${comando}"`));
    }
}

console.log(chalk.dim("Fim!"));
term.close();
}