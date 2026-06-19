import escreva from "../saida.js";
import comandosPossiveis from "../carregarComandosPossiveis.js";

export default function mostrarAcoesItems() {
    const acoes = comandosPossiveis().acoesItems;

    if (acoes.length === 0) return;

    escreva("\nCom os itens do inventário você pode:");
    acoes.forEach(acao => {
        escreva(` - ${acao}`, "magenta");
    });
}
