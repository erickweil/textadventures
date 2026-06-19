import carregarComandosPossiveis from "./carregarComandosPossiveis.js";

export default function validar(comando) {
    const acoes = carregarComandosPossiveis().acoes;
    // Verifica se o comando existe na lista, ignorando maiúsculas/minúsculas
    if (acoes.some(acao => acao.toLowerCase() === comando.toLowerCase())) {
        return true;
    }
    return false;
}
