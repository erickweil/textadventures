import campos from "./campos.js";

export default function mudarStatusCampo(nomeCampo, novoStatus) {
    if (campos[nomeCampo]) {
        campos[nomeCampo].situacao = novoStatus;
        return true;
    }
    return false;
}
