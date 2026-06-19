import leia from "../src/entrada.js";
import escreva from "../src/saida.js";

export default {
    texto: "Você está no Pasto 02. Um ambiente tranquilo com algumas árvores ao fundo.",
    opcoes: {
        "1": { texto: "Voltar para a Horta", destino: "Horta" },
        "2": { texto: "Descansar na sombra", arte: "arvore", acao: () => "Você senta encostado em uma árvore e sente a brisa fresca. Revigorante!" },
        "3": { texto: "Procurar por frutas", arte: "maca", acao: async () => {
            escreva("Você caminha entre as árvores antigas do pasto e nota algo vermelho brilhando nas folhas.", "yellow");
            escreva("É uma macieira! Ela parece não ser cuidada há anos, mas os frutos continuam incrivelmente apetitosos.", "yellow");
            escreva("[1] Pegar e comer uma maçã", "green");
            escreva("[2] Deixar para lá", "green");
            const escolha = await leia("\nO que você faz? > ");
            if (escolha.trim() === "1") return "Você arranca uma maçã do galho e dá uma grande mordida. O sabor é doce e suculento, matando sua fome na hora!";
            return "Você vira as costas para a macieira e continua sua caminhada. Afinal, há muito trabalho a fazer.";
        } }
    }
};