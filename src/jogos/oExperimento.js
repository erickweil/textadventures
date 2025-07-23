//const prompt = require("prompt-sync")();
//const readline = require('readline')
//const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
import { console, prompt, process, rl } from "../mockConsole";

export function oExperimento() {
return new Promise((resolve, reject) => {
    
let norte = false
let sul = false
let leste = false
let oeste = false

let solto = false
let viuLeste = false
let tentouAbrirBau = false
let bicicletaRemovida = false
let bauAberto = false
let encontrouChave = false
let quantiaFusivel = 0
let pegouFusivel1 = false
let pegouFusivel2 = false
let pegouFusivel3 = false
let fusiveisColocados = false
let disjuntorLigado = false
let emCaldeira = false
let decoracaoLivre = false
let portaCaldeiraAberta = false
let luzAcesa = false
let emEscada = false
let sabeSenha = false
let livre = false
let senhaUsada = false

// Variáveis da Fase 2 porque eu acho que tentar misturar isso aqui com as coisas da fase 1
// vai ficar muito complexo/bagunçado de entender
let fase2Ativa = false
let salaAtual = "deposito"
let turnos = 0
let mortesFase2 = 0
let cozinhaExplodiu = false
let garagemExplodiu = false
let temBarraFerro = false
let portaQuintalAberta = false
let jogoEncerrado = false

let inventario = []
let inventarioFase2 = []

// Inventário
function adicionarItem(item) {
    if (!inventario.includes(item)) {
        inventario.push(item)
        console.log(`Você pegou: ${item}`)
    } else {
        console.log(`Você já tem o item: ${item}`)
    }
}

function mostrarInventario() {
    if (inventario.length === 0) {
        console.log("Você não carrega nada consigo.")
    } else {
        console.log("Você possui:", inventario.join(", "))
    }
}

let primeiraRodada = true

// Funções
function Leste() {
    if (!solto){
        console.log(
        "Estou a Leste do porão.\n"+
        "Vejo a mesa onde estou amarrado, ao lado de uma pilha de caixas.\n"+
        "Logo acima da mesa consigo ver uma estreita janela quebrada.\n"+
        "Eu até consigo alcançá-la, mas jamais conseguiria passar por ela,\n"+
        "nem mesmo se os cacos de vidro afiados fossem removidos.")
    viuLeste = true
    norte = false
    sul = false
    leste = true
    oeste = false
    } else {
        console.log(
        "Estou a Leste do porão.\n"+
        "Vejo a mesa onde eu estava amarrado, ao lado de uma pilha de caixas.\n"+
        "Logo acima da mesa consigo ver uma estreita janela quebrada.\n"+
        "Eu até consigo alcançá-la, mas jamais conseguiria passar por ela,\n"+
        "nem mesmo se os cacos de vidro afiados fossem removidos.")
    norte = false
    sul = false
    leste = true
    oeste = false
    }
}

function Norte() {
    if (solto) {
        console.log(
        "Estou a Norte do porão.\n"+
        "Consigo ver um grande painel com diversas ferramentas velhas e enferrujadas.\n"+
        "Dificilmente algo aqui teria utilidade, é mais provavel que eu pegue tétano ao toca-las.\n"+ 
        "Se bem que... o pé de cabra não parece tão péssimo assim...\n"+ 
        "embora pareça que vai quebrar após um único uso")
    norte = true
    sul = false
    leste = false
    oeste = false
    } else {
        console.log("Vejo um painel com algumas ferramentas, mas não consigo alcançá-las.")
    }
}

function Sul() {
    if (solto) {
        console.log(
        "Estou a Sul do porão.\n"+
        "Vejo um baú reforçado e uma velha bicicleta quebrada ao sul do porão,\n"+ 
        "talvez tenha algo útil alí. Bem, também tem um pequeno cômodo aqui do lado.\n"+ 
        "A porta não está trancada, apenas emperrada. Talvez, se eu tivesse algo pra usar de alavanca...")
    norte = false
    sul = true
    leste = false
    oeste = false
    } else {
    console.log("Tem um baú e uma bicicleta lá atrás, mas não posso alcançá-los.") 
    }
}

function Oeste() {
    if (solto) {
        console.log(
        "Estou a Oeste do porão.\n"+
        "Um disjuntor se encontra bem ao pé da escada, mas não tem fusível algum para funcionar.\n"+
        "Parece que ele precisa de três fusíveis... mas para que eu ligaria as luzes?\n"+
        "Enfim, consigo ver minha liberdade no topo da escada!\n"+
        "...Mas também vejo outra porta de uma espécie de depósito abaixo dela.\n"+ 
        "Essa porta não parece estar trancada.")
    norte = false
    sul = false
    leste = false
    oeste = true
    } else {
        console.log(
        "Vejo uma escada ao lado de um disjuntor. A escada deve levar para a saída, contudo,\n"+
        "tem uma outra porta na parte inferior dela.")
    }
}

// sala do porão
const salaPorao = {
    descricao: "Você abre os olhos com certa dificuldade, vislumbrando um cômodo mal iluminado.\n" +
        "Parece um porão velho, nada bem cuidado. A única fonte de luz é a janela alta atrás de você.\n" +
        "Ao tentar levantar, no entanto, você nota que está preso.\n" +
        "Sua perna está firmemente amarrada ao pé de uma mesa por uma corda.\n" +
        "Talvez, explorando a área ao seu redor, você consiga encontrar uma forma de se libertar\n" +
        "e então fugir.",
    acoes: {
        "L": Leste,
        "N": Norte,
        "S": Sul,
        "O": Oeste,
    }
}

// Comandos e ações
function processarComando(comando) {
    const partes = comando.split(" ")
    const acao = partes[0]
    const alvo = partes.slice(1).join(" ")

    if (acao === "inventario") {
        mostrarInventario()
        return;
    }
    // ações do porão
    if (acao === "olhar") {
        if (alvo === "janela" && viuLeste && leste && !inventario.includes("caco de vidro")) {
            console.log("A janela está quebrada. Pegar um caco não será nada difícil.")

        } else if (alvo === "caixas" && solto && leste && !tentouAbrirBau) {
            console.log("Sem saber o que exatamente procurar, vejo apenas pilhas de papéis velhos,\n"+ 
            "canetas secas e grampeadores quebrados ao revistar essas caixas.")

        } else if (alvo === "caixas" && solto && leste && tentouAbrirBau) {
            console.log("Ei, espera aí, aquilo é uma chave? Talvez ela possa abrir alguma coisa por aqui.")
        
        } else if (alvo === "pe de cabra" && solto && norte && !inventario.includes("pé de cabra")) {
            console.log("O pé de cabra está velho e gasto. Vai quebrar bem fácil,\n"+
                "mas ainda pode ser útil.")
        
        } else if (alvo === "bicicleta" && solto && sul && !bicicletaRemovida && !emCaldeira) {
        console.log("Uma bicicleta coberta de poeira. A roda está torcida no formato de um L,\n"+
            "a corrente está arrebentada e os freios nem devem mais funcionar. A única coisa que\n"+
            "essa bicicleta faz é me impedir de abrir o baú abaixo dela")
        
        } else if (alvo === "bau") {
            if(solto && sul && bicicletaRemovida && bauAberto && !emCaldeira) {
            console.log("Você abre o baú com sucesso! Dentro dele, no entanto, não parece ter muito\n"+
            "além de cabos velhos, partes eletrônicas e- Ei! Você achou um fusível.")

            } else if(solto && sul && bicicletaRemovida && !bauAberto && !emCaldeira) {
            console.log("Um velho baú reforçado está trancado com uma trava de metal.\n"+ 
            "Droga... Parece que você preciso de uma chave para abrí-lo.")
            tentouAbrirBau = true

            } else if(solto && sul && !bicicletaRemovida && !bauAberto && !emCaldeira) {
            console.log("Um velho baú reforçado está trancado com uma trava de metal.\n"+ 
            "Droga... Parece que você preciso de uma chave para abrí-lo...\n"+
            "mas tirar a bicicleta de cima do baú já seria um bom começo")
            tentouAbrirBau = true
            }

        } else if (alvo === "fusivel") {
            if (sul && bauAberto && !pegouFusivel1) {
                console.log("Um fusível aparentemente funcional. Pode vir a calhar.")

                } else if (emCaldeira && !pegouFusivel2) {
                    console.log("Um fusível jogado no chão da sala da caldeira. Parece funcional.")

                } else if (oeste && decoracaoLivre && !pegouFusivel3) {
                    console.log("A pessoa que escondeu esse fusível aqui não é inocente, e nem bobo.")
                    
                } else {
                console.log("Não há mais fusíveis disponíveis para pegar aqui.");
            }

        } else if (alvo === "caderno" && solto && emCaldeira) {
            console.log("Você vê um caderno de capa vermelha. Ele parece estranhamente não empoeirado")
        
        } else if (alvo === "escada" && solto && oeste) {
        console.log("Uma velha escada de madeira. O espaço do seu interior foi reaproveitado\n"+
            "para se tornar um pequeno depósito, ou pelo menos é o que a porta em sua parte\n"+
            "infeior indica. Subindo os degraus da escadda com um olhar, vejo uma possível saída\n"+
            "em seu topo.")

        } else if (alvo === "disjuntor" && solto && oeste) {
        console.log("O disjuntor está bem em frente a escada, contudo, ele não pode ser ligado.\n"+
            "Os fusíveis estão faltando. Seria bom ter um pouco de luz... o dia já está começando\n"+
            "a escurecer..."
        )

        } else if (alvo === "deposito") {
            if (solto && oeste && decoracaoLivre) {
                console.log("Olhando com cautela... A criatura não passa de uma decoração de \n"+
                "dia das bruxas... Na verdade, olhando de perto ela parece até ser um pouco mal\n"+ 
                "feita, tendo em vista a dificuldade de distinguir que criatura essa coisa\n"+
                "deveria ser, mas isso não importa muito, o que importa é que você encontrou\n"+ 
                "um fusível ao lado do pé da decoração feia.")
            } else if (solto) {
                console.log("A porta do depósito parece estar apeanas vagamente escorada.\n"+
                "Não tem nada que te impessa de abri-la")
            }

        } else if (alvo === "porta" && emEscada) {
            if (solto && sabeSenha) {
                console.log("Eu preciso digitar a senha para sair")
            } else if (solto && !sabeSenha) {
                console.log("Aparentemnete, essa é minha única saída. Uma porta trancada atrás de\n"+
                "um código de 4 dígitos. Preciso descobrir qual é a senha para dar o fora daqui.")
            }
        } else {
            console.log("Nada de muito interessante aqui.")
        }
        return;
    }

    if (acao === "pegar") {
        if (alvo === "caco" && viuLeste && leste && !inventario.includes("caco de vidro")) {
            console.log("Você pega um caco afiado da janela quebrada.")
            adicionarItem("caco de vidro")
        
        } else if (alvo === "chave" && leste && tentouAbrirBau && !encontrouChave) {
            encontrouChave = true
            adicionarItem("chave")
        
        } else if (alvo === "pe de cabra" && solto && norte && !inventario.includes("pé de cabra")) {
            adicionarItem("pé de cabra")
        
        } else if (alvo === "bicicleta" && solto && sul && !bicicletaRemovida && !emCaldeira) {
            bicicletaRemovida = true
            console.log("Você move a velha bicicleta para fora do caminho sem muito esforço.")

        } else if (alvo === "caderno" && solto && emCaldeira) {
            console.log("Você pega o caderno de cima do gaveteiro.")
            adicionarItem("caderno")

        } else if (alvo === "fusivel") {
            if (sul && bauAberto && !pegouFusivel1) {
                adicionarItem("fusível do baú")
                pegouFusivel1 = true
                quantiaFusivel++
                } else if (emCaldeira && !pegouFusivel2) {
                    adicionarItem("fusível da caldeira")
                    pegouFusivel2 = true
                    quantiaFusivel++
                } else if (oeste && decoracaoLivre && !pegouFusivel3) {
                    adicionarItem("fusível de Halloween")
                    pegouFusivel3 = true
                    quantiaFusivel++
                    
                } else {
                console.log("Não há mais fusíveis disponíveis para pegar aqui.");
            }
                
        } else {
        console.log("Não posso pegar isso agora.");
        }
        return;
    }

    if (acao === "usar") {
        if (alvo === "caco" && inventario.includes("caco de vidro") && !solto) {
            console.log("Você usa o caco de vidro para cortar suas amarras.");
            solto = true;

        } else if (alvo === "chave" && solto && sul && bicicletaRemovida && !bauAberto && encontrouChave && !emCaldeira) {
            console.log("Você usa a chave para destrancar o baú.");
            bauAberto = true;

        } else if (alvo === "escada" && emEscada) {
            console.log(
            "Você desce as escadas, ouvindo o ranger das tábuas sob seus pés.")
            emEscada = false
            norte = false
            sul = false
            leste = false
            oeste = true

        } else if (alvo === "escada" && solto && oeste) {
            console.log(
            "Você sobe a escada de madeira. A poeira levanta conforme você alcança o topo.\n"+
            "Você vê a porta de saída... trancada.\n"+ 
            "Uma tranca com uma senha de 4 digitos te mantem longe de ser livre")
            emEscada = true

        } else if (alvo === "pe de cabra" && solto && sul && inventario.includes("pé de cabra")) {
            console.log(
            "Você finca o pé de cabra na fresta entre a parede e a porta emperrada, fazendo força\n"+
            "para tentar destravar a porta. O pé de cabra está se curvando perigosamente.\n"+
            "Você segura a parte fragilizada do pé de cabra, tentando fazer com que ele dure mais tempo,\n"+
            "e por um triz, você consegue abrir a porta, mas o pé de cabra se partiu ao meio")
            portaCaldeiraAberta = true

        } else if (alvo === "porta" && emEscada) {
            if (solto && sabeSenha) {
                console.log("Você cruza a porta e finalmente sai do porão")
                livre = true
                iniciarFase2()
            } else if (solto && !sabeSenha) {
                console.log("A porta está trancada. Você não consegue sair sem digitar a senha.")
            }

        } else if (alvo === "porta" && solto && emCaldeira) {
            console.log("Você sai da sala da caldeira e retorna ao porão.")
            emCaldeira = false
            norte = false
            sul = true
            leste = false
            oeste = false

        } else if (alvo === "porta" && solto && sul && portaCaldeiraAberta) {
            console.log("Você passa pela porta outrora emperrada. A porta não revela nada além de\n"+
                "uma salinha feita para a caldeira. O ar aqui parece mais abafado.\n"+
                "Tubos e valvulas se estendem para além da caldeira, passando por trás de um pequeno\n"+
                "gaveteiro de escritório, a primeira vista não muito importante,\n"+
                "até você notar um caderno sobre ele. Ah, tem um fusível caído ao lado do gaveteiro")
            emCaldeira = true

        } else if (alvo === "deposito" && solto && oeste && decoracaoLivre) {
            console.log("Não tem mais nada de útil por aqui.")
            
        } else if (alvo === "deposito" && solto && oeste) {
            console.log("Você abre a porta do depósito abaixo da escada e sente o sangue gelar em\n"+
                "menos de um segundo. Uma criatura diabólica com presas e garras afiadas lhe observa\n"+
                "com um sorriso macabro! Você instintivamente recua, temendo por sua vida.")
            decoracaoLivre = true

        } else if (alvo === "fusivel" && solto && oeste && (quantiaFusivel === 3)) {
            console.log("Você coloca os fuziveis no disjuntor. Agora só falta ligá-lo.")
            fusiveisColocados = true

        } else if (alvo === "disjuntor" && solto && oeste && fusiveisColocados) {
            console.log("Você segura o interruptor de ligar do disjuntor por um segundo inteiro\n"+
                "enquanto respira fundo, e então o liga de uma vez. Um estalo se escuta ressoar\n"+
                "pelo cômodo. As luzes piscam por um momento antes de se estabilizarem.\n"+
                "Você restaurou a energia do porão... e pouco tempo depois, começou a sentir\n"+
                "um cheiro estranho...")
            disjuntorLigado = true
            luzAcesa = true

        } else if (alvo === "caderno") {
            if (!luzAcesa && inventario.includes("caderno")) {
                console.log("Está muito escuro para conseguir ler qualquer coisa.")
            } else if (luzAcesa && inventario.includes("caderno")) {
                console.log("Você lê o conteúdo do caderno...\n"+
                    "Dia 25/07 - Hoje é um dia importa. O dia em que meu pequeno experimento começa\n"+
                    "A cobaia ainda respira. Em breve vai estar se perguntando por quê. A resposta\n"+
                    "é simples: curiosidade. Quero ver até onde vai a teimosia antes de se quebrar\n"+ 
                    "por completo. Não deve durar mais de um dia, claro... mas é suficiente para\n"+ 
                    "o meu entretenimento.")
                    sabeSenha = true
            }

        } else if (alvo === "2507" && solto && sabeSenha && emEscada) {
            console.log("Você usa a senha na tranca e ela se abre em um piscar de olhos.")
            senhaUsada = true

        } else {
            console.log("Não posso usar isso agora.")
        }
        return;
    }

    if (acao === "sair") {
        console.log("Você decide desistir... por agora.");
        process.exit();
    }

    if (["n", "s", "l", "o"].includes(comando) && (emEscada || emCaldeira)) {
        console.log("Não posso fazer isso agora.");
        return;
    }

    const direcao = salaPorao.acoes[comando.toUpperCase()];
    if (direcao) {
        direcao();
    } else {
        console.log("Não posso fazer isso agora.");
    }
}

// === INÍCIO DA FASE 2 ===

// Inventário
function adicionarItemFase2(item) {
    if (!inventarioFase2.includes(item)) {
        inventarioFase2.push(item)
        console.log(`Você pegou: ${item}`)
    } else {
        console.log(`Você já tem o item: ${item}`)
    }
}

function mostrarInventarioFase2() {
    if (inventarioFase2.length === 0) {
        console.log("Você não carrega nada consigo.")
    } else {
        console.log("Você possui:", inventarioFase2.join(", "))
    }
}

// Transição da Fase 1 para Fase 2
function iniciarFase2() {
    fase2Ativa = true
    console.log(" \n"+"======= A CASA EM CHAMAS =======")
    console.log("Você sobe do porão para um depósito escuro e empoeirado, onde começa sua fuga.")
    descreverSala()
}

function avancarTurno() {
    turnos++
    checarTempo()
}

function reiniciarFase2() {
    mortesFase2++;
    salaAtual = "deposito"
    turnosRestantes = 13
    inventarioFase2 = []
    cozinhaExplodiu = false
    garagemExplodiu = false
    portaQuintalAberta = false

    console.log("\n...\n")

    switch (mortesFase2) {
        case 1:
            console.log("Você se vê no depósito, se sentindo como num déjà vu.")
            break
        case 2:
            console.log("Você se vê no depósito... Suas mãos ainda tremem graças a explosão")
            break
        case 3:
            console.log("Você vê o deposito mais uma vez... Não é possível que seja só impressão...")
            break
        case 4:
            console.log("É como acordar de um sonho dentro de um sonho... Sem parar..!")
            break
        default:
            console.log("Não desista. Você está quase lá, só precisa ser mais rápido.")
    }
    descreverSala()
}

function checarTempo() {
    if (turnos === 5 && !cozinhaExplodiu) {
        console.log("BOOM! Um estrondo violento ecoa pela casa. A cozinha explodiu.")
        cozinhaExplodiu = true
        if (salaAtual === "cozinha" || salaAtual === "corredor") {
            console.log("Você estava na cozinha quando o botijão explodiu. Um clarão inunda sua visão.")
            reiniciarFase2()
            return
        }
    }
    if (turnos === 9 && !garagemExplodiu) {
        console.log("BOOM! A garagem arde em chamas. Os galões de gasolina prostrados na garagem\n"+ 
            "explodiram, e agora, o segunda andar está começando a desabar sobre sua cabeça.")
        garagemExplodiu = true
        if (salaAtual === "garagem" || salaAtual === "corredor") {
            console.log("Você foi pego pela explosão na garagem. Um clarão inunca sua visão.")
            reiniciarFase2()
            return
        }
    }
    if (turnos === 13 && garagemExplodiu && cozinhaExplodiu) {
        console.log("A casa desaba com as explosões recentes e as chamas... e você não saiu a tempo.\n"+ 
            "Você foi soterrado pelos destroços flamejantes.")
        garagemExplodiu = true
        if (salaAtual === "garagem" || salaAtual === "corredor") {
            console.log("Você foi pego pela explosão na garagem. Um clarão inunca sua visão.")
            reiniciarFase2()
            return
        }
    }
}

function descreverSala() {
    salaAtual = salaAtual.toLowerCase();
    switch (salaAtual) {
        case "deposito":
            console.log(
                "Você está no depósito. Há ferramentas e prateleiras espalhadas pelos cantos.\n"+
                "A janela está barricada. Ao sul, caixas bloqueiam o caminho para a garagem.\n"+
                "A única saída visível está a oeste, mas um cheiro de madeira e terra queimada se\n"+ 
                "intensificam junto a uma fumaça fina que passa pela porta.")
            break
        case "salaleste":
            console.log(
                "Você está na parte Leste da sala. Não há janelas aqui. Um velho sofa rasgado descansa\n"+
                "no meio da sala, de frente para um rack quebrado escorado na parede.\n"+ 
                "Você vê um corredor ao sul, a fumaça vem com mais força daquele lugar.\n"+ 
                "Oeste leva à outra metade da sala.")
            break
        case "salaoeste":
            console.log("Você está na parte Oeste da sala. No chão ainda restam os fantasmas de uma\n"+ 
                "mesa de jantar e quatro cadeiras. As janelas estão barricadas com tábuas.\n"+ 
                "Você vê uma cozinha ao sul. Ao norte tem uma porta dupla de vidro coberta\n"+
                "com jornais velhos e fita, mas ela está trancada. Leste leva à outra metade da sala.")
            break
        case "cozinha":
            if (cozinhaExplodiu) {
                console.log("A cozinha está em ruínas, engolida por chamas e fumaça.\n"+ 
                    "Não é seguro permanecer aqui. Pedaços do piso superior já estão desmoronando")
            } else {
                console.log("Você está na cozinha. As janelas estão barricadas. Os únicos sobreviventes\n"+ 
                    "nesse cômodo são a pia de inox, uns armários, o velho fogão e-\n"+ 
                    "Deus! Um botijão de gás em um incêndio!. É perigoso ficar aqui.")
            }
            break
        case "garagem":
            if (garagemExplodiu) {
                console.log("A garagem desabou. Você vê chamas e destroços por todos os lados.")
            } else {
                console.log("Você está na garagem. Seus olhos passeiam pela poça de óleo no centro\n"+ 
                    "da garagem quase vazia, antes de pousarem nos galões de gasolina ao canto,\n"+
                    "bem ao lado de uma barra de ferro torta, entulhada com outras tralhas inflamáveis.\n"+
                    "Esse lugar não é seguro. Não tem janelas aqui. Oeste leva ao corredor de onde\n"+ 
                    "você veio. Norte está bloqueado por caixas familiares.\n"+ 
                    "Do outro lado está o depósito de onde você saiu.")
            }
            break
        case "corredor":
            console.log("Você está no corredor principal da casa. A fumaça densa vem da escada que\n"+
                "leva ao andar de cima. Não tem como subir lá em cima. De repente algo fez sentido\n"+ 
                "em sua mente. O cheiro estranho que subiu depois que o disjuntor foi ativado...\n"+ 
                "Se a parte elétrica estiver como o resto da casa, então a fiação estragada deve ter\n"+
                "começado o incêndio. Ao Norte, você retornará ao lado leste da sala. \n"+
                "A Leste, uma porta leva a garagem. Oeste leva a cozinha. Sul leva a porta de entrada.")
            break
        case "entrada":
            console.log("Você está na entrada da casa. A porta está trancada com um cadeado de senha.\n"+
                "Você não tem tempo para descobrir a senha. Precisa encontrar outra forma de sair")
            break
        case "quintal":
            console.log("Você atravessa a porta dupla e corre para o quintal.\n"+
            "Você corre desajeitadamente, cambaleando pela grama alta e só para de correr quando\n"+ 
            "escuta um estrondo abafato atrás de si. Ao se virar, você vê a casa, já a uns cinquenta\n"+
            "metros de distãncia, desabando em chamas como uma fogueira de acampamento gigante.\n"+
            "Você se inclina sobre seus joelhos e respira fundo, completamente exasperado, mas então...\n"+
            "Uma voz estranha reverbera de trás de você...\n"+
            " \n"+
            "'Meus parabens! Dessa vez você saiu vivo. O experimento foi gratificante, mas acredito que\n"+
            "vamos ter que repetir mais algumas vezes... Mas não se preocupe.\n"+ 
            "Não vai durar mais do que um dia'\n"+
            " \n"+
            "Sua visão escureceu no segundo em que se ouviu um estalar de dedos no ar...\n"+
            " \n"+
            "Você abre os olhos com certa dificuldade, vislumbrando um cômodo mal iluminado.\n" +
            "Parece um porão velho, nada bem cuidado. A única fonte de luz é a janela alta atrás de você.\n" +
            "Ao tentar levantar, no entanto, você nota que está preso.\n" +
            "Sua perna está firmemente amarrada ao pé de uma mesa por uma corda.\n" +
            "Talvez, explorando a área ao seu redor, você consiga encontrar uma forma de se libertar\n" +
            "e então fugir. \n"+
            " \n"+
            "======= O FIM... ======= \n"+
            " \n"+
            "Pressione 'X' para prosseguir...")
            encerrando = true
            return
        default:
            console.log("Você está perdido na casa.")
    }
}

function mover(direcao) {
    const dir = direcao.toUpperCase();
    const sala = salaAtual.toLowerCase(); 

    const transicoes = {
        deposito: { O: "salaleste" },
        salaleste: { O: "salaoeste", S: "corredor" },
        salaoeste: { L: "salaleste", S: "cozinha", N: "quintal" },
        cozinha: { N: "salaoeste", L: "corredor" },
        corredor: { O: "cozinha", L: "garagem", N: "salaleste", S: "entrada" },
        garagem: { O: "corredor" },
        entrada: { N: "corredor" }
    };

    // Caso especial: acesso ao quintal
    if (sala === "salaoeste" && dir === "N") {
        if (portaQuintalAberta) {
            salaAtual = "quintal";
            avancarTurno();
            descreverSala();
        } else {
            console.log("A porta dupla está trancada. Você precisa arrombá-la antes de sair por aqui.");
        }
        return;
    }

    if (transicoes[sala] && transicoes[sala][dir]) {
        salaAtual = transicoes[sala][dir];
        avancarTurno();
        descreverSala();
    } else {
        console.log("Você não pode ir nessa direção.");
    }
}

// Ações da fase 2
function olhar(alvo) {
    if (alvo === "janela" && salaAtual === "deposito") {
        console.log("Está coberta por tábuas pregadas com força. Nenhuma chance de sair por aqui.")
    } else if (alvo === "barra de ferro" && salaAtual === "garagem" && !temBarraFerro) {
        console.log("Você nota uma barra de ferro encostada entre duas caixas. Pode ser útil.")
    } else {
        console.log("Você não vê nada de especial.")
    }
}

function pegar(alvo) {
    if (alvo === "barra de ferro" && salaAtual === "garagem" && !temBarraFerro) {
        temBarraFerro = true
        adicionarItemFase2("barra de ferro")
    } else {
        console.log("Não é possível pegar isso agora.")
    }
}

function usar(item) {
    const sala = salaAtual.toLowerCase()

    if (item === "barra de ferro" && sala === "salaoeste" && !portaQuintalAberta) {
        console.log("Você bate a barra de ferro repetidamente na porta dupla.\n" +
            "Após alguns segundos que soaram como um século, a porta se estilhaçou ao poucos.\n" +
            "Os jornais e a fita amenizaram o alcance dos cacos, então você saiu praticamente ileso.")
        portaQuintalAberta = true
    } else {
        console.log("Não é possível usar isso aqui.")
    }
}

function iniciarCreditos() {
    if (jogoEncerrado) return

    jogoEncerrado = true
    console.clear()

    const creditos = [" \n",
        "┌───────────────────────────────────────────────┐\n",
        "│                                               │\n",
        "│           ████ █████████████ ████             │\n",
        "│         ██████ O EXPERIMENTO ██████           │\n",
        "│           ████  — Créditos — ████             │\n",
        "│                                               │\n",
        "├───────────────────────────────────────────────┤\n",
        "\n",
        "Roteiro, Programação, Design, Cenários, Narrativa:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Direção de Cenas e Diálogos Internos:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Inteligência Emocional das Portas Trancadas:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Supervisão dos Fusiveis:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Controle de Qualidade da Barra de Ferro™:\n",
        "> Evelyn do Vale\n",
        "\n",
        "Efeitos Sonoros Mentais de Explosões:\n",
        "> Julia Alves (e um botijão imaginário)\n",
        "\n",
        "Testes de Sanidade em Ciclos Temporais:\n",
        "> Julia Alves\n",
        "\n",
        "Mente Sombria Por Trás da Voz Misteriosa:\n",
        "> Evelyn do Vale (interpretando ela mesma)\n",
        "\n",
        "QA, Beta Testing e Autotortura Voluntária:\n",
        "> Evelyn do Vale e Julia Alves, algumas centenas de vezes seguidas\n",
        "\n",
        "Emoções Do Jogador? Nenhuma Garantida.\n",
        "Bugs? Se tiver, nós já odiamos eles.\n",
        "\n",
        "┌───────────────────────────────────────────────┐\n",
        "│     Este jogo foi feito com sangue, suor,     │\n",
        "│   e prompts digitados (alguns de madrugada).  │\n",
        "└───────────────────────────────────────────────┘\n",
        "\n",
        "Obrigada por jogar.\n",
        "\n",
        "█ O jogo será encerrado automaticamente █"
    ]

    mostrarCreditos(creditos)

    function escreverLinha(texto, callback) {
    let i = 0
    function escrever() {
        if (i < texto.length) {
        process.stdout.write(texto.charAt(i))
        i++;
        setTimeout(escrever, 50)
        } else {
        process.stdout.write('\n')
        callback()
        }
    }
  escrever()
    }

    function mostrarCreditos(creditos, index = 0) {
        if (index < creditos.length) {
        escreverLinha(creditos[index], () => mostrarCreditos(creditos, index + 1))
        } else {
        console.log("\nEncerrando o jogo...")
        process.exit(0)
        }
    }
}

function processarComandoFase2(comando) {

    if (jogoEncerrado) return

    if (comando.toLowerCase() === "x") {
        iniciarCreditos()
        return
    }

    const partes = comando.split(" ")
    const acao = partes[0]
    const alvo = partes.slice(1).join(" ")

    if (acao === "sair") {
        console.log("Você decide desistir... por agora.");
        process.exit();
    }

    if (["N", "S", "L", "O"].includes(comando.toUpperCase())) {
    mover(comando.toUpperCase())
    } else if (acao === "usar") {
        usar(alvo)
    } else if (acao === "olhar") {
        olhar(alvo)
    } else if (acao === "pegar") {
        pegar(alvo)
    } else if (acao === "inventario") {
        mostrarInventarioFase2()
    } else {
        console.log("Comando não reconhecido nesta fase.")
    }
}

// Dando partida
console.log("\n======= O PORÃO =======");
console.log(salaPorao.descricao);
primeiraRodada = false;

function perguntar() {
  if (jogoEncerrado) {
    rl.close();
    return;
  }
  console.log("\nAções: N, S, L, O, olhar [item], pegar [item], usar [item], inventario, sair");
  rl.question("> ", (comando) => {
    if (fase2Ativa) {
      processarComandoFase2(comando.trim().toLowerCase());
    } else {
      processarComando(comando.trim().toLowerCase());
    }
    perguntar();
  });
}

perguntar();

});
}