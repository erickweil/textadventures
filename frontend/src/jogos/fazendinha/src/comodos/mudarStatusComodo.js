import comodos from "./comodos.js";

export default function mudarStatusComodo(nomeComodo, propriedade, valor) {
    if (comodos[nomeComodo]) {
        comodos[nomeComodo][propriedade] = valor;
        return true;
    }
    return false;
}
