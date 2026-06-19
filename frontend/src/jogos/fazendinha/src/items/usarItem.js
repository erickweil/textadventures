import acoes from "./acoes.js";
import inventorio from "../inventorio/inventorio.js";

export default function usar(acao) {
    for (let item of inventorio) {
        if (Object.keys(acoes[item]).includes(acao)) {
            acoes[item][acao]();
        }
    }
}

