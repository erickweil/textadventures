import inventorio from "../inventorio/inventorio.js";
import acoes from "./acoes.js";

export default function buscarAcoes() {
    let acoesItem = {};

    inventorio.forEach(item => {
        if (!acoes[item]) return;

        Object.keys(acoes[item]).forEach(nomeAcao => {
            acoesItem[nomeAcao] = acoes[item][nomeAcao];
        });
    });

    return acoesItem;
}
