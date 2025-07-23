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
import './style.css';
import { _prompt, addCommand, prompt, termClear, termPrint } from './terminal';

const listaJogos = {
    labirinto: {
        autores: ["Lucas Coimbra Santi"],
        descricao: [
            "seu desafio é sair com vida. As direçoes aparacem em sua tela, voce possui saude e uma mochila para receber seus itens, mas use com sabedoria."
            ,"comandos:"
            ,"-pegar [item];"
            ,"-usar [item];"
        ],
        f: labirinto
    },
    experimento: {
        autores: ["Evelyn do Vale", "Julia Alves"],
        descricao: ["Você se vê preso dentro de um porão e precisa interagir com os cenários e itens ao seu redor para conseguir escapar."],
        f: oExperimento
    },
    aveltor: {
        autores: ["Pedro Henrique", "Kaua Fernandes"],
        descricao: [
        ,"Um herói anónimo, com o destino do mundo nos ombros, inicia a sua jornada na pacata cidade de Eldrun, um pequeno ponto de luz no vasto e antigo continente de Aveltor. Forjado numa guerra esquecida entre deuses da luz e das trevas, este mundo agora vive uma paz frágil."
        ,""
        ,"Este continente é um verdadeiro labirinto de cidades movimentadas, florestas densas, rios traiçoeiros e templos esquecidos, cada um com sua própria história e caminhos que levam a novos desafios e segredos. O jogador, nosso herói, deve usar a sua astúcia e coragem para navegar por este mundo, seguindo os movimentos cardeais (N, S, L, O) e interagindo com o cenário através de comandos específicos."
        ,""
        ,"Guiado por rumores sobre um artefacto perdido — o Coração de Ébano — o herói deve desvendar puzzles, colecionar itens e tomar decisões que podem alterar o mundo para sempre. Cada objeto encontrado, cada porta aberta e cada enigma resolvido é um passo em direção ao confronto final com os segredos mais profundos de Aveltor."
        ,""
        ,"Mapa e descrições:"
        ,"Para conseguir chegar no objetivo final você deve tomar decisões estratégicas e em alguns momentos rápidas. Ex:"
        ,""
        ,"Acampamento"
        ,"Um acampamento aparentemente vazio"
        ,">Investigar Fogueira"
        ,">Investigar Cabana"
        ,""
        ,"Você começa a investigar a cabana e escuta os ladrões que estavam acampando ali chegar e eles te matam."
        ,"Você foi lento"
        ,""
        ,"Ações:"
        ,"Alguns lugares possuem ações especiais diferente das movimentações padrões do jogo. Ex:"
        ,">Investigar"
        ,">Ler"
        ,">Abrir"
        ,">Usar"
        ],
        f: aveltor
    },

    vereth: {
        descricao: ["Demo do meu jogo"],
        autores: ["Kauã Fernandes"],
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
        autores: ["Sidnei Salustiano", "Elias Moreira"],
        f: chave
    },

    zafiir: {
        descricao: ["Ao despertar sem memória no meio de um laboratório em ruínas, seu desafio é claro: sobreviver. Você precisará explorar cada sala sombria em busca de cartões de acesso e pistas sobre o desastre que ocorreu, tudo isso enquanto é caçado implacavelmente pela 'Za'fiir', uma criatura experimental que agora domina o complexo. Use sua inteligência para desvendar os segredos da instalação e encontrar uma maneira de escapar antes que seja tarde demais."],
        autores: ["Lucas Iunges", "Tales Geraldo"],
        f: zafiir
    },

    mansao: {
        descricao: ["Festa na Mansão",
        ,"Como Jogar"
        ,"Você foi convidado para uma festa misteriosa nos fundos de uma mansão... mas algo está fora do normal."
        ,"Use W, A, S, D para se mover entre salas."
        ,"Pressione I para interagir com objetos ou ambientes."
        ,"Pressione B para abrir o inventário e examinar itens."
        ,"Durante batalhas, use A para atacar, D para se defender e B para ver suas habilidades."
        ,"Explore cada ambiente, colete pistas e enfrente seus próprios medos."
        ,"Suas decisões influenciam o rumo da história. Observe bem o que carrega e para onde vai."
        ,"Dica: nem tudo é o que parece. O que você teme pode ser parte de você."
        ],
        autores: ["Luiz Guilhermy"],
        f: mansao
    },

    assombrada: {
        descricao: [
        ,"Bem-vindo à Casa Assombrada!"
        ,"Você acordou em frente a um casarão abandonado sem saber como chegou aqui. O ar é frio e um sentimento ruim aperta seu peito. Sua única chance é entrar, explorar os cômodos sombrios e encontrar uma maneira de escapar."
        ,"Procure por itens, resolva os quebra-cabeças e, o mais importante, tente não se perder na escuridão. A casa tem muitos segredos, e talvez nem todos queiram que você saia."
        ,"Você tem coragem de descobrir a verdade e encontrar a saída?"
        ],
        autores: ["Gabriel Ciconello", "Pedro Noemerg", "Lucas Raphael"],
        f: assombrada
    },

    viajante: {
        descricao: [
        ,"O Tempo do Viajante (um jogo no terminal). "
        ,""
        ,"Entre numa história na qual ocorre um problema no seu caminhão, e o seu objetivo é trazer de volta o funcionamento de seu veículo para retornar ao seu trabalho normal como entregador de produtos. Mas, para isso, será necessário várias caminhadas, interagir com pessoas e efeituar ações para realizar essa sua meta temporária."
        ,""
        ,"Como jogar:"
        ,"Aparecerá mensagens na tela e, para interagir, basta digitar algum comando que estará na tela do terminal para progredir na história."
        ,""
        ,"Exemplo:"
        ,"-ver a hora"
        ,"*Horário é 1:03PM agora, um dia normal.*"
        ],
        autores: ["Gabriela Cunha", "Leonardo Pereira"],
        f: viajante
    },

    lol: {
        descricao: ["Baseado em League Of Legends, você irá se aventurar pelo mapa de Summoner's Rift com o objetivo de ser vitorioso. Para alcançar a vitória, deverá ajudar os aliados que encontra pelo caminho "],
        autores: ["Willem", "João Vitor"],
        f: lol
    },

    sonhos: {
        descricao: ["história interativa onde o personagem acorda em uma floresta misteriosa e precisa explorar."],
        autores: ["Antônio Júnior"],
        f: sonhos
    },

    scaperoom: {
        descricao: [
        ,"Lucineia e eu fizemos este código que é um Labirinto."
        ,"A ideia é que você deve andar até achar o fim do labirinto e ver o que te aguarda!"
        ,"Aceita essa aventura? "
        ,"Para iniciar use: node scapeRoom.js no terminal e siga as orientações."
        ,"Observações: É necessário ter instalado o prompt-sync para interação pelo terminal de sua IDE."
        ,"Movimente-se com: N, S, L, O"
        ,""
        ,"Ação:"
        ,""
        ,"pegar: chave"
        ,"pular: poça com um líquido estranho"
        ,"fazer cafe"
        ],
        autores: ["Luciano", "Lucineia"],
        f: scaperoom
    },

    floresta: {
        descricao: [
        ,"Você está preso em uma floresta misteriosa e deve encontrar o caminho até a saída. Para vencer, você precisa pensar estrategicamente e usar itens no momento certo."
        ,"Use as letras N (norte), S (sul), L (leste) e O (oeste) para se mover."
        ,""
        ,"Use “pegar” quando encontrar um item visível."
        ,""
        ,"Digite “usar [item]” para interagir com o cenário."
        ,""
        ,"Digite “inventario” para ver os itens que você carrega."
        ,""
        ,"Digite “sair” a qualquer momento para encerrar a aventura."
        ],
        autores: ["Érika Pacheco","Lucivan Pacheco"],
        f: floresta
    }
};

addCommand("jogar", {
    f: async (qual) => {
        let jogo = listaJogos[qual];
        if(jogo) {
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
        termPrint(
            'Para jogar, insira "jogar" seguido do nome de um jogo, da lista abaixo:\n',
            '\n',
            ...Object.keys(listaJogos).map((k) => {
                return `${k} - ${listaJogos[k].autores.join(", ")} \n`;
            })
        );
    }
});

termPrint(
    'Seja bem vindo! para começar sua aventura, insira "jogar" seguido do nome de um jogo:\n',
    '\n',
    ...Object.keys(listaJogos).map((k) => {
        return `${k} - ${listaJogos[k].autores.join(", ")} \n`;
    })
);
_prompt();