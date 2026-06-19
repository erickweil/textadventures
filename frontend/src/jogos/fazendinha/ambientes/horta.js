import leia from "../src/entrada.js";
import escreva from "../src/saida.js";
import buscar from "../src/inventorio/buscarItem.js";
import pegar from "../src/items/pegarItem.js";
import guardar from "../src/inventorio/guardarItem.js";

let localAtual = "Horta";

export default {
    texto: "Você está na Horta, o cheiro de terra molhada é relaxante.",
    opcoes: {
        "1": { texto: "Voltar para o Celeiro", destino: "Celeiro" },
        "2": { texto: "Ir para o Pasto 02", destino: "Pasto02" },
        "3": { texto: "Regar os tomates", arte: "gota", acao: () => {
            if (buscar("regador")) {
                return "Você pegou o regador e molhou a terra. Os tomates parecem mais vivos!";
            }
            return "Eita!! Você precisa de um regador para regar seus tomates.";
        } },
        "4": { texto: "Inspecionar a terra", arte: "minhoca", acao: async () => {
            escreva("Você mexe na terra e encontra uma minhoca gigante.", "yellow");
            escreva("[1] Colocar na terra de novo", "green");
            escreva("[2] Guardar no bolso para usar de isca", "green");
            
            const escolha = await leia("\nO que vai fazer com ela? > ");
            if (escolha === "1") return "A minhoca voltou para a terra. Ótimo para a saúde do solo!";
            if (escolha === "2") return "Você guardou a minhoca no bolso. Eca!";
            return "Você ficou encarando a minhoca até ela fugir.";
        } },
        "5": { texto: "Arrancar ervas daninhas", arte: "grama", acao: () => {
            if (buscar("enxada")) {
                return "Você passou alguns minutos limpando os canteiros. A horta parece muito mais organizada."
            }
            return "Eita!! Você precisa de uma enxada para tirá-las";
        } },
        "6": { texto: "Colher tomates maduros", arte: "tomate", acao: () => "Você encontrou alguns tomates vermelhos e suculentos. Parecem deliciosos!" },
        "7": { texto: "Verificar o espantalho", arte: "espantalho", acao: () => "O espantalho está um pouco torto e com um chapéu engraçado. Parece que está fazendo um bom trabalho, nenhum pássaro por perto." },
        "8": { texto: "Olhar para o canto da porteira", arte: "regador", acao: async () => {
            if (!buscar("regador")) {
                escreva("\nVocê encontrou um Regador!\n", "magenta");
            
                let escolha = await leia("Deseja pegá-lo? [s/n]");
                if (escolha.toLowerCase() === "s") {
                    if (pegar("regador")) {
                        return "Você pegou o Regador.";
                    }
                    return "";
                }
            } else {
                escreva("\nNo final da regagem, você guarda o seu Regador aqui!\n", "magenta");

                let escolha = await leia("Deseja guardar? [s/n]");
                if (escolha.toLowerCase() === "s") {
                    guardar("regador", localAtual);
                    return "Você guardou seu Regador.";
                }
            }

            return "Você parou de olhar para o canto da porteira.";
        } },
        "9": { texto: "Há um balde aqui, embaixo da torneira", arte: "balde", acao: async () => {
            if (!buscar("balde")) {
                escreva("\nVocê está diante de um balde!\n", "magenta");
            
                let escolha = await leia("Deseja pegá-lo? [s/n] ");
                if (escolha.toLowerCase() === "s") {
                    if (pegar("balde")) {
                        return "Você pegou um balde já com água.";
                    }
                    return "";
                }
            } else {
                escreva("\nVocê pode colocar seu balde aqui, embaixo da torneira!\n", "magenta");

                let escolha = await leia("Deseja guardá-lo? [s/n] ");
                if (escolha.toLowerCase() === "s") {
                    guardar("balde", localAtual);
                    return "Você colocou seu balde embaixo da torneira.";
                }
            }

            return "Você se afastou da torneira";
        } }
    },
    items: []
};
