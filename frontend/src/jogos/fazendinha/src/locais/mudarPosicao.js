import locais from "./locais.js";

export default function mudar(novoLocal) {

    /*
    A sala de estar tem conexão direta com o campo 1 e vice-versa.

    O código abaixo verifica se o usuário está no campo e esta tentando entrar na casa.
    */
    if (locais.espaco == "campo" && novoLocal == "sala de estar") {
        locais.espaco = "casa";

    // O código abaixo verifica se o usuário está na casa e esta tentando sair.
    } else if (locais.espaco == "casa" && novoLocal == "campo 1") {
        locais.espaco = "campo";
    }
    locais.local = novoLocal;
}
