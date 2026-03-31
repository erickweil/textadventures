import { inventario, adicionarItem, mostrarInventario, removerItem, inventarioFase2, adicionarItemFase2, mostrarInventarioFase2, removerItemFase2 } from "./inventario";
import { console, process, rl } from "../../mockConsole";

export function Fase1(rl, onComplete) {

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


    function Leste() {
        if (!solto) {
            console.log(
                "Estou a Leste do porão.\n" +
                "Vejo a mesa onde estou amarrado, ao lado de uma pilha de caixas.\n" +
                "Logo acima da mesa consigo ver uma estreita janela quebrada.\n" +
                "Eu até consigo alcançá-la, mas jamais conseguiria passar por ela,\n" +
                "nem mesmo se os cacos de vidro afiados fossem removidos.")
            viuLeste = true
            norte = false
            sul = false
            leste = true
            oeste = false
        } else {
            console.log(
                "Estou a Leste do porão.\n" +
                "Vejo a mesa onde eu estava amarrado, ao lado de uma pilha de caixas.\n" +
                "Logo acima da mesa consigo ver uma estreita janela quebrada.\n" +
                "Eu até consigo alcançá-la, mas jamais conseguiria passar por ela,\n" +
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
                "Estou a Norte do porão.\n" +
                "Consigo ver um grande painel com diversas ferramentas velhas e enferrujadas.\n" +
                "Dificilmente algo aqui teria utilidade, é mais provavel que eu pegue tétano ao toca-las.\n" +
                "Se bem que... o pé de cabra não parece tão péssimo assim...\n" +
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
                "Estou a Sul do porão.\n" +
                "Vejo um baú reforçado e uma velha bicicleta quebrada ao sul do porão,\n" +
                "talvez tenha algo útil alí. Bem, também tem um pequeno cômodo aqui do lado.\n" +
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
                "Estou a Oeste do porão.\n" +
                "Um disjuntor se encontra bem ao pé da escada, mas não tem fusível algum para funcionar.\n" +
                "Parece que ele precisa de três fusíveis... mas para que eu ligaria as luzes?\n" +
                "Enfim, consigo ver minha liberdade no topo da escada!\n" +
                "...Mas também vejo outra porta de uma espécie de depósito abaixo dela.\n" +
                "Essa porta não parece estar trancada.")
            norte = false
            sul = false
            leste = false
            oeste = true
        } else {
            console.log(
                "Vejo uma escada ao lado de um disjuntor. A escada deve levar para a saída, contudo,\n" +
                "tem uma outra porta na parte inferior dela.")
        }
    }

    const acoesDirecao = { "N": Norte, "S": Sul, "L": Leste, "O": Oeste };

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

    return function processarComando(comando) {
        const partes = comando.trim().split(" ")
        const acao = partes[0].toLowerCase()
        const alvo = partes.slice(1).join(" ").toLowerCase()

        if (acao === "inventario") {
            mostrarInventario()
            return;
        }
        if (["n", "s", "l", "o"].includes(acao)) {
            if (emEscada || emCaldeira) {
                console.log("Não posso fazer isso agora.")
                return
            }
            const funcaoDirecao = acoesDirecao[acao.toUpperCase()]
            if (funcaoDirecao) funcaoDirecao()
            return
        }

        if (acao === "olhar") {
            if (alvo === "janela" && viuLeste && leste && !inventario.includes("caco de vidro")) {
                console.log("A janela está quebrada. Pegar um caco não será nada difícil.")

            } else if (alvo === "caixas" && solto && leste && !tentouAbrirBau) {
                console.log("Sem saber o que exatamente procurar, vejo apenas pilhas de papéis velhos,\n" +
                    "canetas secas e grampeadores quebrados ao revistar essas caixas.")

            } else if (alvo === "caixas" && solto && leste && tentouAbrirBau) {
                console.log("Ei, espera aí, aquilo é uma chave? Talvez ela possa abrir alguma coisa por aqui.")

            } else if (alvo === "pe de cabra" && solto && norte && !inventario.includes("pé de cabra")) {
                console.log("O pé de cabra está velho e gasto. Vai quebrar bem fácil,\n" +
                    "mas ainda pode ser útil.")

            } else if (alvo === "bicicleta" && solto && sul && !bicicletaRemovida && !emCaldeira) {
                console.log("Uma bicicleta coberta de poeira. A roda está torcida no formato de um L,\n" +
                    "a corrente está arrebentada e os freios nem devem mais funcionar. A única coisa que\n" +
                    "essa bicicleta faz é me impedir de abrir o baú abaixo dela")

            } else if (alvo === "bau") {
                if (solto && sul && bicicletaRemovida && bauAberto && !emCaldeira) {
                    console.log("Você abre o baú com sucesso! Dentro dele, no entanto, não parece ter muito\n" +
                        "além de cabos velhos, partes eletrônicas e- Ei! Você achou um fusível.")

                } else if (solto && sul && bicicletaRemovida && !bauAberto && !emCaldeira) {
                    console.log("Um velho baú reforçado está trancado com uma trava de metal.\n" +
                        "Droga... Parece que você preciso de uma chave para abrí-lo.")
                    tentouAbrirBau = true

                } else if (solto && sul && !bicicletaRemovida && !bauAberto && !emCaldeira) {
                    console.log("Um velho baú reforçado está trancado com uma trava de metal.\n" +
                        "Droga... Parece que você preciso de uma chave para abrí-lo...\n" +
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
                console.log("Uma velha escada de madeira. O espaço do seu interior foi reaproveitado\n" +
                    "para se tornar um pequeno depósito, ou pelo menos é o que a porta em sua parte\n" +
                    "infeior indica. Subindo os degraus da escadda com um olhar, vejo uma possível saída\n" +
                    "em seu topo.")

            } else if (alvo === "disjuntor" && solto && oeste) {
                console.log("O disjuntor está bem em frente a escada, contudo, ele não pode ser ligado.\n" +
                    "Os fusíveis estão faltando. Seria bom ter um pouco de luz... o dia já está começando\n" +
                    "a escurecer..."
                )

            } else if (alvo === "deposito") {
                if (solto && oeste && decoracaoLivre) {
                    console.log("Olhando com cautela... A criatura não passa de uma decoração de \n" +
                        "dia das bruxas... Na verdade, olhando de perto ela parece até ser um pouco mal\n" +
                        "feita, tendo em vista a dificuldade de distinguir que criatura essa coisa\n" +
                        "deveria ser, mas isso não importa muito, o que importa é que você encontrou\n" +
                        "um fusível ao lado do pé da decoração feia.")
                } else if (solto) {
                    console.log("A porta do depósito parece estar apeanas vagamente escorada.\n" +
                        "Não tem nada que te impessa de abri-la")
                }

            } else if (alvo === "porta" && emEscada) {
                if (solto && sabeSenha) {
                    console.log("Eu preciso digitar a senha para sair")
                } else if (solto && !sabeSenha) {
                    console.log("Aparentemnete, essa é minha única saída. Uma porta trancada atrás de\n" +
                        "um código de 4 dígitos. Preciso descobrir qual é a senha para dar o fora daqui.")
                }
            } else {
                console.log("Nada de muito interessante aqui.")
            }
            return
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
                    "Você sobe a escada de madeira. A poeira levanta conforme você alcança o topo.\n" +
                    "Você vê a porta de saída... trancada.\n" +
                    "Uma tranca com uma senha de 4 digitos te mantem longe de ser livre")
                emEscada = true

            } else if (alvo === "pe de cabra" && solto && sul && inventario.includes("pé de cabra")) {
                console.log(
                    "Você finca o pé de cabra na fresta entre a parede e a porta emperrada, fazendo força\n" +
                    "para tentar destravar a porta. O pé de cabra está se curvando perigosamente.\n" +
                    "Você segura a parte fragilizada do pé de cabra, tentando fazer com que ele dure mais tempo,\n" +
                    "e por um triz, você consegue abrir a porta, mas o pé de cabra se partiu ao meio")
                portaCaldeiraAberta = true

            } else if (alvo === "porta" && emEscada) {
                if (solto && sabeSenha) {
                    console.log("Você cruza a porta e finalmente sai do porão")
                    livre = true
                    onComplete()
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
                console.log("Você passa pela porta outrora emperrada. A porta não revela nada além de\n" +
                    "uma salinha feita para a caldeira. O ar aqui parece mais abafado.\n" +
                    "Tubos e valvulas se estendem para além da caldeira, passando por trás de um pequeno\n" +
                    "gaveteiro de escritório, a primeira vista não muito importante,\n" +
                    "até você notar um caderno sobre ele. Ah, tem um fusível caído ao lado do gaveteiro")
                emCaldeira = true

            } else if (alvo === "deposito" && solto && oeste && decoracaoLivre) {
                console.log("Não tem mais nada de útil por aqui.")

            } else if (alvo === "deposito" && solto && oeste) {
                console.log("Você abre a porta do depósito abaixo da escada e sente o sangue gelar em\n" +
                    "menos de um segundo. Uma criatura diabólica com presas e garras afiadas lhe observa\n" +
                    "com um sorriso macabro! Você instintivamente recua, temendo por sua vida.")
                decoracaoLivre = true

            } else if (alvo === "fusivel" && solto && oeste && (quantiaFusivel === 3)) {
                console.log("Você coloca os fuziveis no disjuntor. Agora só falta ligá-lo.")
                fusiveisColocados = true

            } else if (alvo === "disjuntor" && solto && oeste && fusiveisColocados) {
                console.log("Você segura o interruptor de ligar do disjuntor por um segundo inteiro\n" +
                    "enquanto respira fundo, e então o liga de uma vez. Um estalo se escuta ressoar\n" +
                    "pelo cômodo. As luzes piscam por um momento antes de se estabilizarem.\n" +
                    "Você restaurou a energia do porão... e pouco tempo depois, começou a sentir\n" +
                    "um cheiro estranho...")
                disjuntorLigado = true
                luzAcesa = true

            } else if (alvo === "caderno") {
                if (!luzAcesa && inventario.includes("caderno")) {
                    console.log("Está muito escuro para conseguir ler qualquer coisa.")
                } else if (luzAcesa && inventario.includes("caderno")) {
                    console.log("Você lê o conteúdo do caderno...\n" +
                        "Dia 25/07 - Hoje é um dia importa. O dia em que meu pequeno experimento começa\n" +
                        "A cobaia ainda respira. Em breve vai estar se perguntando por quê. A resposta\n" +
                        "é simples: curiosidade. Quero ver até onde vai a teimosia antes de se quebrar\n" +
                        "por completo. Não deve durar mais de um dia, claro... mas é suficiente para\n" +
                        "o meu entretenimento.")
                    sabeSenha = true
                }
            }

            if (alvo === "2507" && solto && sabeSenha && emEscada) {
                console.log("Você usa a senha na tranca e ela se abre em um piscar de olhos.")
                senhaUsada = true
            } else {
                console.log("Não posso usar isso agora.")
            }
            return;
        }

        if (acao === "pegar") {
            if (!alvo) {
                console.log("Pegar o quê?")
                return
            }

            if (alvo === "caco de vidro" && viuLeste && leste && !inventario.includes("caco de vidro")) {
                adicionarItem("caco de vidro")
            } else if (alvo === "pe de cabra" && solto && norte && !inventario.includes("pé de cabra")) {
                adicionarItem("pé de cabra")
            } else if (alvo === "fusivel" && sul && bauAberto && !pegouFusivel1) {
                adicionarItem("fusível")
                pegouFusivel1 = true
                quantiaFusivel++
            } else if (alvo === "fusivel" && emCaldeira && !pegouFusivel2) {
                adicionarItem("fusível")
                pegouFusivel2 = true
                quantiaFusivel++
            } else if (alvo === "fusivel" && oeste && decoracaoLivre && !pegouFusivel3) {
                adicionarItem("fusível")
                pegouFusivel3 = true
                quantiaFusivel++
            } else if (alvo === "caderno" && emCaldeira && !inventario.includes("caderno")) {
                adicionarItem("caderno")
            } else if (alvo === "chave" && leste && solto && tentouAbrirBau && !inventario.includes("chave")) {
                adicionarItem("chave")
                encontrouChave = true
            } else {
                console.log("Você não consegue pegar isso agora.")
            }
            return
        }

        if (acao === "largar") {
            if (!alvo) {
                console.log("Largar o quê?")
                return
            }

            if (removerItem(alvo)) {
                // Item removido com sucesso
            }
            return
        }

        if (acao === "sair") process.exit()
    }

    return processarComando
}