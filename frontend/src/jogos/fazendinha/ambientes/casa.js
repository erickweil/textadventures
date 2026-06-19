import escreva from "../src/saida.js";
import leia from "../src/entrada.js";
import buscar from "../src/inventorio/buscarItem.js";
import pegar from "../src/items/pegarItem.js";
import guardar from "../src/inventorio/guardarItem.js";

let localAtual = "Casa";

export default {
    texto: "Você está na sala de estar da casa. Uma lareira apagada e uma poltrona empoeirada compõem o ambiente.",
    opcoes: {
        "1": { texto: "Sair para o Celeiro", destino: "Celeiro" },
        "2": { texto: "Olhar a lareira", arte: "lareira", acao: () => "Você olha dentro da lareira. Está cheia de cinzas e um jornal velho de uma semana atrás." },
        "3": { texto: "Verificar o correio", arte: "carta", acao: async () => {
            escreva("Você vai até a porta e olha a caixa de correio.", "yellow");
            escreva("[1] Abrir a caixa", "green");
            escreva("[2] Deixar para depois", "green");
            const escolha = await leia("\nO que você faz? > ");
            if (escolha === "1") return "Dentro há apenas uma conta de luz vencida e um panfleto de pizzaria.";
            return "Você decide não olhar o correio agora.";
        } },
        "4": { texto: "Há uma vassoura perto da porta", arte: "vassoura", acao: async () => {
            if (!buscar("vassoura")) {
                escreva("\nVocê encontrou uma Vassoura!\n", "magenta");
            
                let escolha = await leia("Deseja pegá-lo? [s/n] ");
                if (escolha.toLowerCase() === "s") {
                    if (pegar("vassoura")) {
                        return "Você pegou a Vassoura.";
                    }
                    return "";
                }
            } else {
                escreva("\nVocê está carregando uma vassoura o tempo todo...\n", "magenta");

                let escolha = await leia("Deseja colocar a vassoura perto da porta? [s/n] ");
                if (escolha.toLowerCase() === "s") {
                    guardar("vassoura", localAtual);
                    return "Você colocou a Vassoura perto da porta.";
                }
            }

            return "Você apenas olhou a vassoura e não fez nada!!!";
        } }
    },
    items: []
};
