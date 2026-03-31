import { inventario, adicionarItem, mostrarInventario, inventarioFase2, adicionarItemFase2, mostrarInventarioFase2 } from "./inventario";
import { console, process, rl } from "../../mockConsole";

export function Fase2(rl, finalizarJogoCallback) {

    let fase2Ativa = false
    let salaAtual = "deposito"
    let turnos = 0
    let mortesFase2 = 0
    let cozinhaExplodiu = false
    let garagemExplodiu = false
    let temBarraFerro = false
    let portaQuintalAberta = false
    let jogoEncerrado = false

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
        turnos = 0
        inventarioFase2.length = 0
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
    iniciarFase2()

    return processarComandoFase2;
}