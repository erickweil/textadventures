import escreva from "../saida.js";
import comandosPossiveis from "../carregarComandosPossiveis.js";

export default function mostrarAcoes() {
    const { acoesLocal } = comandosPossiveis();

    if (acoesLocal.length === 0) return;

    escreva("\nNeste local você pode:");
    acoesLocal.forEach(acao => {
        escreva(` - ${acao}`, "cyan");
    });
}
