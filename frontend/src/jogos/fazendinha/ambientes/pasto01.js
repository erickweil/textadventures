import leia from "../src/entrada.js";
import escreva from "../src/saida.js";

export default {
    texto: "Você está no Pasto 01. O cercado está ao sul.",
    opcoes: {
        "1": { texto: "Voltar para o Celeiro", destino: "Celeiro" },
        "2": { texto: "Ir para o Cercado", destino: "Cercado" },
        "3": { texto: "Examinar a grama", arte: "grama", acao: () => "A grama está alta e verde, perfeita para os animais pastarem." },
        "4": { texto: "Chamar os animais", arte: "vaca", acao: async () => {
            escreva("Você decide chamar os animais...", "yellow");
            escreva("[1] Assobiar alto", "green");
            escreva("[2] Gritar 'Vem vaquinha!'", "green");
            
            const escolha = await leia("\nComo você vai chamá-los? > ");
            if (escolha === "1") return "Você assobia alto, mas nenhum animal aparece. Talvez estejam no Cercado.";
            if (escolha === "2") return "Você grita, e escuta um 'Muuu' bem distante vindo da direção do Cercado.";
            return "Você desiste de chamar e fica admirando a paisagem em silêncio.";
        } }
    }
};