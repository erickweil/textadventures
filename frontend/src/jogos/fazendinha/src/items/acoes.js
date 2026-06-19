import locais from "../locais/locais.js";
import mudarStatusCampo from "../campos/mudarStatusCampo.js";
import mudarStatusComodo from "../comodos/mudarStatusComodo.js";

let acoes = {
    "arado": {
        arar: () => {
            if (locais.espaco !== "campo") {
                return { sucesso: false, mensagem: "Você só pode arar nos campos de plantação." };
            }
            if (mudarStatusCampo(locais.local, "arado")) {
                return { sucesso: true, mensagem: `Você arou o ${locais.local}. A terra está pronta para plantar.` };
            }
            return { sucesso: false, mensagem: "Não foi possível arar este local." };
        }
    },
    "enchada": {
        capinar: () => {
            if (locais.espaco !== "campo") {
                return { sucesso: false, mensagem: "Você só pode capinar nos campos de plantação." };
            }
            if (mudarStatusCampo(locais.local, "capinado")) {
                return { sucesso: true, mensagem: `Você capinou o ${locais.local}. O mato foi removido.` };
            }
            return { sucesso: false, mensagem: "Não foi possível capinar este local." };
        }
    },
    "chave 1": {
        abrir: () => {
            if (locais.espaco !== "casa" || locais.local !== "sala de estar") {
                return { sucesso: false, mensagem: "A chave não serve neste local." };
            }
            if (mudarStatusComodo(locais.local, "portaAberta", true)) {
                return { sucesso: true, mensagem: "Você abriu a porta da entrada com a chave." };
            }
            return { sucesso: false, mensagem: "Não foi possível usar a chave aqui." };
        }
    }
};

export default acoes;
