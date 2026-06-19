import escreva from "../saida.js";
import inventorio from "./inventorio.js";

export default function mostrar() {
    escreva("\nINVENTÓRIO:");
    if (inventorio.length === 0) {
        escreva(" (vazio)", "gray");
        return;
    }
    inventorio.forEach(i => escreva(` [ ${i} ]`, "yellow"));
}
