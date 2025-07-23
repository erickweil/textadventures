//const prompt = require("prompt-sync")()
import { console, prompt, process, rl } from "../mockConsole";

export async function scaperoom() {

const salas = {
    inicio:{
        nome: "inicio",
        descricao: "Você acorda em um local desconhecido, sem lembrar de como chegou ali. Vê um papel no chão escrito: Agora é contigo! Encontre a saída do labirinto!",
        conexoes: {"L": "Labirinto1", "N": "Labirinto2"},
        objetos:[],
        obstaculo: null
        },
    Labirinto1:{
        nome: "Labirinto1",
        descricao: () => {
            if(obstaculosSuperados["Labirinto1"]){
                return "Agr o caminho está livre! Siga em frente!";
            } else {
                return "Vc está em um corredor estreito, o chão está úmido, vc nota que tem uma poça de líquido estranho, pule e siga em frente";
            }
        }, 
        conexoes: {"L": "Labirinto2", "O":"inicio"},
        objetos:[],
        obstaculo: "Poça de um líquido estranho, cuidado!"
    },
    Labirinto2:{
        nome: "Labirinto2",
        descricao: "Vc está em um corredor estreito, o chão está seco.Parece que não há obstáculos. Siga em frente!",
        conexoes: {"O": "Labirinto1", "L":"LabirintoCafe", "S": "inicio"},
        objetos:[],
        obstaculo: null

    },
    LabirintoCafe: {
        nome: "LabirintoCafe",
        descricao: () => {
            if (cafeBebido) {
                return "O aroma de café fresco ainda paira no ar. A cafeteira está quieta agora. Você se sente revigorado.";
            }
            return "Vc encontrou um cantinho do café, tem cápsulas de vários sabores e uma cafeteira.Faça um cafezinho e relaxe um pouco. E de quebra encontra uma poltrona, uma mesa e uma chave.";
        },
        conexoes: {"O": "Labirinto2", "L": "Labirinto3", "S": "Fim"},
        objetos:["chave"],
        obstaculo: null
    },
    Labirinto3:{
        nome: "Labirinto3",
        descricao: () => {
            if (cafeBebido) {
                return "Revigorado pelo cafezinho, vc está prontinho pra continuar. Na frente há uma bifurcação. Boa sorte!";
            }
            return "Você deixou o cantinho do café para trás e continua sua jornada. Na frente há uma bifurcação. Boa sorte!";
        },
        conexoes: {"O": "LabirintoCafe", "N": "Fim"},
        objetos:[],
        obstaculo: null
    },
    Fim:{
        nome: "Fim",
        descricao: () => {
            if (inventario.includes("chave")) {
                return "Vc encontrou a saída do Labirinto! À sua frente, uma piscina e uma casa vazia, disponível pra relaxar! A porta da mansão está trancada. Use a chave para abri-la.";
            }
            return "Vc encontrou a saída do Labirinto! À sua frente, uma piscina e uma casa vazia, disponível pra relaxar! A porta da mansão está trancada. Você precisa de uma chave. Talvez devesse voltar para o café para procurar.";
        },
        conexoes: {"S": "Labirinto3", "N": "LabirintoCafe"},
        objetos:[],
        obstaculo: null
    }
}
    

let salaAtual = salas["inicio"]
let inventario = []
let obstaculosSuperados = {}
let cafeBebido = false


function mostrarDescricao() {
    if(typeof salaAtual.descricao == "function"){
        console.log(salaAtual.descricao())
    }else{
        console.log(salaAtual.descricao)
    }
    if(salaAtual.objetos.length > 0){
        console.log("Objetos disponíveis:")
        for(let i = 0; i < salaAtual.objetos.length; i++){
            console.log("-", salaAtual.objetos[i])
        }
    }
    if(salaAtual.obstaculo && !obstaculosSuperados[salaAtual.nome]){
        console.log("Obstáculo:" + salaAtual.obstaculo)
    }
    console.log("Saidas disponíveis: ")
    for(let direcao in salaAtual.conexoes){
        console.log("-" + direcao)
    }
}
function executarComando(linhaDeComando){
    const partes = linhaDeComando.toLowerCase().split(" ")
    const comando = partes[0]
    const alvo = partes.slice(1).join(" ")
    
    if(comando == "sair"){
        console.log("Vc optou por desistir. Q pena!")
        process.exit(0)
        return
    }
    if(comando == "pegar"){
        if(salaAtual.objetos.length >0){
            let objeto = salaAtual.objetos.pop()
            inventario.push(objeto)
            console.log("Vc pegou: " + objeto)
        }else{
            console.log("Não há objetos disponíveis aki!")
        }
        return
    }
    if(comando == "pular" || comando == "pule"){
        if(salaAtual.obstaculo == "Poça de um líquido estranho, cuidado!"){
            obstaculosSuperados[salaAtual.nome] = true
            console.log("Vc pulou a poça com sucesso!")
        }else {
            console.log("Não há nada para pular aqui")
        }
        return
    }

    if ((comando == "fazer" || comando == "beber") && alvo == "cafe") {
        if (salaAtual.nome == "LabirintoCafe") {
            if (!cafeBebido) {
                cafeBebido = true;
                console.log("Você prepara um café delicioso e o bebe. Suas energias estão renovadas!");
            } else {
                console.log("Você já tomou seu café, não seja guloso!");
            }
        } else {
            console.log("Não há uma cafeteira aqui para você usar.");
        }
        return;
    }

    if (comando == "usar") {
        if (alvo == "chave") {
            if (inventario.includes("chave")) {
                if (salaAtual.nome == "Fim") {
                    obstaculosSuperados[salaAtual.nome] = true;
                    console.log("Você usou a chave e destrancou a porta! Você pode entrar, relaxar e assistir uma gravação do que aconteceu antes de vc ir parar no labirinto. Parabéns, você venceu!");
                    process.exit(0);
                } else {
                    console.log("Não há nada para usar a chave aqui.");
                }
            } else {
                console.log("Você não tem uma chave.");
            }
        } else {
            console.log(`Comando 'usar' inválido. Tente 'usar chave'.`);
        }
        return;
    }

    let direcao = comando.toUpperCase()
    if(["N", "S", "L", "O"].includes(direcao)){
        let proximaSalaNome = salaAtual.conexoes[direcao]
        if(proximaSalaNome){
            if (salaAtual.obstaculo && !obstaculosSuperados[salaAtual.nome]) {
                console.log("Tem um obstáculo no caminho. Você não pode passar.");
                return;
            }
            salaAtual = salas[proximaSalaNome]
        } else {
            console.log("Não há saída para este lado!")
        }
    } else {
        console.log("Comando inválido! Tente 'pegar', 'usar [item]', 'pular', 'fazer cafe', 'N', 'S', 'L', 'O', ou 'sair'.")
    }
}
console.log("Vc precisa encontrar a saída do labirinto! Use os comandos 'L', 'O', 'N' ou 'S' para se mover. Use 'pegar' para pegar objetos, 'pular' para pular um obstáculo, 'fazer cafe' para se revigorar, e 'usar [item]' para usar algo do seu inventário. Se for desistir use o comando 'sair'. ")
while(true){
    console.log("\n")
    mostrarDescricao()
    const comando = await prompt("> ")
    if(comando){
        executarComando(comando)
        }
}

}