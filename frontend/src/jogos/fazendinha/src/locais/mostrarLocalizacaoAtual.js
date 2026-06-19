import locais from "./locais.js";
import escreva from "../saida.js";
import campos from "../campos/campos.js";
import comodos from "../comodos/comodos.js";

export default function mostrarLocAtual() {
    escreva("=".repeat(40));
    escreva(`Você está na ${locais.espaco.toUpperCase()}`);
    escreva(`Local: ${locais.local}`);

    if (locais.espaco === "campo" && campos[locais.local]) {
        const campo = campos[locais.local];
        escreva(campo.descricao, "white");
        escreva(`Situação do solo: ${campo.situacao}`, "cyan");
    } else if (comodos[locais.local]) {
        escreva(comodos[locais.local].descricao, "white");
    }

    escreva("=".repeat(40));
}
