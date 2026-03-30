import { principal } from './jogo/principal';
import { assombrada } from './jogos/assombrada';
import { aveltor } from './jogos/aveltor';
import { chave } from './jogos/chave';
import { floresta } from './jogos/floresta';
import { labirinto } from './jogos/labirinto';
import { lol } from './jogos/lol';
import { mansao } from './jogos/mansao';
import { oExperimento } from './jogos/oExperimento';
import { scaperoom } from './jogos/scaperoom';
import { sonhos } from './jogos/sonhos';
import { vereth } from './jogos/vereth';
import { viajante } from './jogos/viajante';
import { zafiir } from './jogos/zafiir';
// @ts-ignore
import './style.css';
import { _prompt, optionsPrompt, addCommand, prompt, termClear, termPrint, addSuggestions, setActiveSuggestions, clearActiveSuggestions } from './terminal';
import { fetchClient } from './utils/fetchApi';

type ListaJogo = {
    descricao: string[];
    autores: string[];
    comandos?: string[];
    f: () => Promise<void>;
};

const listaJogos: Record<string, ListaJogo> = {
    online: {
        autores: ["Erick Leonardo Weil"],
        descricao: ["Um mini-MMO online, mas é tudo em texto."],
        f: principal
    },
    labirinto: {
        autores: ["Lucas Coimbra Santi"],
        descricao: [
            "seu desafio é sair com vida. As direçoes aparacem em sua tela, voce possui saude e uma mochila para receber seus itens, mas use com sabedoria."
            , "comandos:"
            , "-pegar [item];"
            , "-usar [item];"
        ],
        comandos: [
            "abrir porta",
            "quintal",
            "voltar para a rua",
            "voltar",
            "sala escura",
            "pular",
            "ir para o jardim",
            "subir na arvore",
            "ir para o telhado",
            "descer",
            "entrar na porta",
            "olhar em volta",
            "investigar",
            "dispensa",
            "entrar na dispensa",
            "pegar chave",
            "pegar lanterna",
            "pegar bandagem",
            "usar chave",
            "usar lanterna",
            "usar bandagem",
            "ex"
        ],
        f: labirinto
    },
    experimento: {
        autores: ["Evelyn do Vale", "Julia Alves"],
        descricao: ["Você se vê preso dentro de um porão e precisa interagir com os cenários e itens ao seu redor para conseguir escapar."],
        comandos :[
            "n",
            "s",
            "l",
            "o",
            "olhar",
            "pegar",
            "usar",
            "inventario",
            "sair",
            "janela",
            "caixas",
            "pe de cabra",
            "bicicleta",
            "bau",
            "fusivel",
            "caderno",
            "escada",
            "disjuntor",
            "deposito",
            "porta",
            "chave",
            "caco",
            "barra de ferro",
            "2507",
            "x"
        ],
        f: oExperimento,
    },
    aveltor: {
        autores: ["Pedro Henrique", "Kaua Fernandes"],
        descricao: [
            "Um herói anónimo, com o destino do mundo nos ombros, inicia a sua jornada na pacata cidade de Eldrun, um pequeno ponto de luz no vasto e antigo continente de Aveltor. Forjado numa guerra esquecida entre deuses da luz e das trevas, este mundo agora vive uma paz frágil."
            , ""
            , "Este continente é um verdadeiro labirinto de cidades movimentadas, florestas densas, rios traiçoeiros e templos esquecidos, cada um com sua própria história e caminhos que levam a novos desafios e segredos. O jogador, nosso herói, deve usar a sua astúcia e coragem para navegar por este mundo, seguindo os movimentos cardeais (N, S, L, O) e interagindo com o cenário através de comandos específicos."
            , ""
            , "Guiado por rumores sobre um artefacto perdido — o Coração de Ébano — o herói deve desvendar puzzles, colecionar itens e tomar decisões que podem alterar o mundo para sempre. Cada objeto encontrado, cada porta aberta e cada enigma resolvido é um passo em direção ao confronto final com os segredos mais profundos de Aveltor."
            , ""
            , "Mapa e descrições:"
            , "Para conseguir chegar no objetivo final você deve tomar decisões estratégicas e em alguns momentos rápidas. Ex:"
            , ""
            , "Acampamento"
            , "Um acampamento aparentemente vazio"
            , ">Investigar Fogueira"
            , ">Investigar Cabana"
            , ""
            , "Você começa a investigar a cabana e escuta os ladrões que estavam acampando ali chegar e eles te matam."
            , "Você foi lento"
            , ""
            , "Ações:"
            , "Alguns lugares possuem ações especiais diferente das movimentações padrões do jogo. Ex:"
            , ">Investigar"
            , ">Ler"
            , ">Abrir"
            , ">Usar"
        ],
        comandos: [
            "inventario", "ler bilhete", "sair",
            "seguir para o templo", "voltar pelo rio", "continuar",
            "abrir", "fechar",
            "investigar fonte", "investigar fogueira", "olhar tenda",
            "lutar", "fugir",
            "esquerda", "direita",
            "confessionario", "altar", "deposito", "porao", "biblioteca",
            "procurar",
            "usar anel", "usar cálice", "entrar",
            "luz", "sombra", "caos", "equilíbrio",
            "descer escada", "ler livro", "subir"
        ],
        f: aveltor
    },

    vereth: {
        descricao: ["Demo do meu jogo"],
        autores: ["Kauã Fernandes"],
        comandos: [
            "sair",
            "norte",
            "sul",
            "leste",
            "oeste",
            "observar",
            "olhar",
            "encarar",
            "diario",
            "esperar",
            "tocar",
            "ler",
            "inspecionar",
            "tentar",
            "voltar",
            "vasculhar",
            "refletir",
            "lembrar",
            "pensar",
            "inventario",
            "status",
            "memorias",
            "lutar",
            "poupar"
        ],
        f: vereth
    },

    chave: {
        descricao: [
            "A ideia é simples: você acorda numa sala escura e úmida, sem lembrar de nada. Você precisa encontrar uma chave pra conseguir escapar desse lugar bizarro. Mas não é fácil! Cada sala que você explora tem seus próprios perigos (Torça para não encontrar o monstro) e mistérios. Suas escolhas vão mexer com sua sanidade e até com a sua vida, então pensa bem antes de agir!",
            "Algumas dicas?",
            "",
            "Acende a luz!",
            "Música acalma a alma",
            "Arma boa é arma que se usa",
            "Cuidado no breu",
            "",
            "Cada decisão que a gente toma nesse jogo faz toda a diferença. Será que você consegue ter a coragem de desvendar tudo e achar a saída?"
        ],
        comandos: [
            "sim", "sair",
            "ligar", "olhar", "abrir", "continuar", "voltar", "entrar",
            "norte", "sul", "leste", "oeste",
            "lutar", "fugir", "desviar", "desistir",
            "bloquear com a espada"
        ],
        autores: ["Sidnei Salustiano", "Elias Moreira"],
        f: chave
    },

    zafiir: {
        descricao: ["Ao despertar sem memória no meio de um laboratório em ruínas, seu desafio é claro: sobreviver. Você precisará explorar cada sala sombria em busca de cartões de acesso e pistas sobre o desastre que ocorreu, tudo isso enquanto é caçado implacavelmente pela 'Za'fiir', uma criatura experimental que agora domina o complexo. Use sua inteligência para desvendar os segredos da instalação e encontrar uma maneira de escapar antes que seja tarde demais."],
        autores: ["Lucas Iunges", "Tales Geraldo"],
        comandos: [
            "pegar risty",
            "pegar zaafiir",
            "inventario",
            "inv",
            "atacar",
            "defender",
            "esquivar",
            "S1426"
        ],
        f: zafiir
    },

    mansao: {
        descricao: ["Festa na Mansão"
            , "Como Jogar"
            , "Você foi convidado para uma festa misteriosa nos fundos de uma mansão... mas algo está fora do normal."
            , "Use W, A, S, D para se mover entre salas."
            , "Pressione I para interagir com objetos ou ambientes."
            , "Pressione B para abrir o inventário e examinar itens."
            , "Durante batalhas, use A para atacar, D para se defender e B para ver suas habilidades."
            , "Explore cada ambiente, colete pistas e enfrente seus próprios medos."
            , "Suas decisões influenciam o rumo da história. Observe bem o que carrega e para onde vai."
            , "Dica: nem tudo é o que parece. O que você teme pode ser parte de você."
        ],
        autores: ["Luiz Guilhermy"],
        f: mansao
    },

    assombrada: {
        descricao: [
            "Bem-vindo à Casa Assombrada!"
            , "Você acordou em frente a um casarão abandonado sem saber como chegou aqui. O ar é frio e um sentimento ruim aperta seu peito. Sua única chance é entrar, explorar os cômodos sombrios e encontrar uma maneira de escapar."
            , "Procure por itens, resolva os quebra-cabeças e, o mais importante, tente não se perder na escuridão. A casa tem muitos segredos, e talvez nem todos queiram que você saia."
            , "Você tem coragem de descobrir a verdade e encontrar a saída?"
        ],
        autores: ["Gabriel Ciconello", "Pedro Noemerg", "Lucas Raphael"],
        comandos: [
            "inventario", "ligar lanterna", "desligar lanterna",
            "ler diario", "entrar", "abrir", "leste", "oeste",
            "norte", "sul", "sair", "ligar tv", "desligar tv",
            "pegar diario", "subir para o sotao", "descer para o porao",
            "abrir alcapao", "pegar pe de cabra", "pular janela",
            "fechar janela", "abrir janela", "descer", "pegar chave",
            "subir", "abrir porta", "escapar"
        ],
        f: assombrada
    },

    viajante: {
        descricao: [
            "O Tempo do Viajante (um jogo no terminal). "
            , ""
            , "Entre numa história na qual ocorre um problema no seu caminhão, e o seu objetivo é trazer de volta o funcionamento de seu veículo para retornar ao seu trabalho normal como entregador de produtos. Mas, para isso, será necessário várias caminhadas, interagir com pessoas e efeituar ações para realizar essa sua meta temporária."
            , ""
            , "Como jogar:"
            , "Aparecerá mensagens na tela e, para interagir, basta digitar algum comando que estará na tela do terminal para progredir na história."
            , ""
            , "Exemplo:"
            , "-ver a hora"
            , "*Horário é 1:03PM agora, um dia normal.*"
        ],
        autores: ["Gabriela Cunha", "Leonardo Pereira"],
        comandos: [
            "jogar",
            "criadores",
            "voltar",
            "ver a hora",
            "sair do veiculo",
            "dirigir",
            "entrar no veiculo",
            "diagnostico",
            "checar o combustivel",
            "verificar o motor",
            "checar a caixa de cambio",
            "checar o carda",
            "ok",
            "muito obrigado, mao de broca",
            "frentista",
            "continuar",
            "sair",
            "ir para a mecanica",
            "voltar ao caminhao"
        ],
        f: viajante
    },

    lol: {
        descricao: ["Baseado em League Of Legends, você irá se aventurar pelo mapa de Summoner's Rift com o objetivo de ser vitorioso. Para alcançar a vitória, deverá ajudar os aliados que encontra pelo caminho "],
        autores: ["Willem", "João Vitor"],
        comandos: [
            "Ajudar"
        ],
        f: lol,


    },

    sonhos: {
        descricao: ["história interativa onde o personagem acorda em uma floresta misteriosa e precisa explorar."],
        autores: ["Antônio Júnior"],
        comandos: [
            "ligar",
            "desligar",
            "Voltar",
            "Enfrentar",
            "Caminhar",
            "Pegar",
            "Continuar",
            "Usar",
            "Descartar",
            "Vornex",
            "Miranith",
            "Ithoce",
            "Echoith",
            "Myrlith",
            "Vornox",
            "Thiranith",
            "Miralyth",
            "Lythmira",
            "Entra",
            "VoltarSonhar",
            "Silencio",
            "Memoria",
            "Vento",
            "Eco",
            "Reflexo",
            "Chama",
            "Buraco",
            "Sombra",
            "Vazio",
            "Fumaca",
            "Espelho",
            "Imaginacao",
            "Agua",
            "Lembranca"
        ],
        f: sonhos
    },

    scaperoom: {
        descricao: [
            "Lucineia e eu fizemos este código que é um Labirinto."
            , "A ideia é que você deve andar até achar o fim do labirinto e ver o que te aguarda!"
            , "Aceita essa aventura? "
            , "Para iniciar use: node scapeRoom.js no terminal e siga as orientações."
            , "Observações: É necessário ter instalado o prompt-sync para interação pelo terminal de sua IDE."
            , "Movimente-se com: N, S, L, O"
            , ""
            , "Ação:"
            , ""
            , "pegar: chave"
            , "pular: poça com um líquido estranho"
            , "fazer cafe"
        ],
        autores: ["Luciano", "Lucineia"],
        comandos: [
            "sair",
            "pegar",
            "pular",
            "pule",
            "fazer cafe",
            "beber cafe",
            "usar chave"
        ],
        f: scaperoom
    },

    floresta: {
        descricao: [
            "Você está preso em uma floresta misteriosa e deve encontrar o caminho até a saída. Para vencer, você precisa pensar estrategicamente e usar itens no momento certo."
            , "Use as letras N (norte), S (sul), L (leste) e O (oeste) para se mover."
            , ""
            , "Use “pegar” quando encontrar um item visível."
            , ""
            , "Digite “usar [item]” para interagir com o cenário."
            , ""
            , "Digite “inventario” para ver os itens que você carrega."
            , ""
            , "Digite “sair” a qualquer momento para encerrar a aventura."
        ],
        comandos: [
            "pegar",
            "usar mapa rasgado",
            "usar fruta",
            "usar corda",
            "usar machado",
            "usar tocha",
            "inventario",
            "sair"
        ],
        autores: ["Érika Pacheco", "Lucivan Pacheco"],
        f: floresta
    }
};

addSuggestions(Object.keys(listaJogos).map(j => `jogar ${j}`));


async function iniciarJogo(qual: string) {
    const jogo = listaJogos[qual];
    if (jogo) {
        if (jogo.comandos) setActiveSuggestions(jogo.comandos);
        termClear();
        termPrint(qual);
        termPrint(...jogo.descricao.map((s) => `${s}\n`));
        termPrint("Feito por:", jogo.autores.join(", "));
        termPrint("");
        try {
            await jogo.f();
        } catch (e) {
            console.error(e);
            termPrint("ERRO!", e);
        } finally {
            clearActiveSuggestions();
        }
        termPrint("Encerrado!");
    } else {
        termPrint("Jogo desconhecido...");
    }
}



function printarJogos() {
    const [principal, ...outros] = Object.keys(listaJogos);
    termPrint(
        'Insira "jogar" seguido do nome de um jogo:\n\n',
        '[Jogo MMO online]\n',
        `${principal} - ${listaJogos[principal].autores.join(", ")}\n`,
        '\n',
        '[Outros jogos, offline]\n',
        ...outros.map((k) => {
            return `${k} - ${listaJogos[k].autores.join(", ")} \n`;
        })
    );
}

addCommand("jogar", {
    f: async (qual) => {
        let jogo = listaJogos[qual];
        if (jogo) {
            if (jogo.comandos) setActiveSuggestions(jogo.comandos);
            termClear();
            termPrint(qual);
            termPrint(...jogo.descricao.map((s) => `${s}\n`));
            termPrint("Feito por:", jogo.autores.join(", "));
            termPrint("");
            termPrint("");
            try {
                await jogo.f();
            } catch (e) {
                console.error(e);
                termPrint("ERRO!", e);
            } finally {
                clearActiveSuggestions();
            }
            termPrint(" ");
            termPrint("Encerrado!");
        } else {
            termPrint("Jogo desconhecido...");
        }
    }
});

addCommand("ajuda", {
    f: async () => {
        printarJogos();
    }
});

try {
    const info = await fetchClient.info();
    await principal(info);
} catch (e) {
    console.error(e);
    termPrint("Parece que você não está logado.");
    termPrint("Use o comando 'jogar online' para fazer login ou criar uma conta. \n\n");
}

termPrint(
    'Seja bem vindo! comece já a sua aventura!'
);
printarJogos();

_prompt();