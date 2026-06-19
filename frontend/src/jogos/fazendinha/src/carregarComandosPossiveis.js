import campos from "./campos/campos.js";
import comodos from "./comodos/comodos.js";
import acoesItemsInventorio from "./items/acoesItemsInventorio.js";
import locais from "./locais/locais.js";
import inventorio from "./inventorio/inventorio.js";

function acoesDoLocal() {
    const acoes = [];

    if (locais.espaco === "campo" && campos[locais.local]) {
        acoes.push(...campos[locais.local].conexoes);
    } else if (comodos[locais.local]) {
        acoes.push(...comodos[locais.local].conexoes);

        const objetos = comodos[locais.local].objetos || {};
        for (const [nomeObjeto, dados] of Object.entries(objetos)) {
            acoes.push(`examinar ${nomeObjeto}`);
            for (const item of dados.itens) {
                acoes.push(`pegar ${item}`);
            }
        }
    }

    return acoes;
}

export default function possiveisAcoes() {
    const acoesItems = Object.keys(acoesItemsInventorio());
    const acoesLocal = acoesDoLocal();

    return {
        acoesItems,
        acoesLocal,
        acoes: [...acoesItems, ...acoesLocal]
    };
}

export function executarAcaoLocal(comando) {
    const cmd = comando.toLowerCase();

    if (locais.espaco === "campo" && campos[locais.local]?.conexoes.some(c => c.toLowerCase() === cmd)) {
        return { tipo: "mover", destino: campos[locais.local].conexoes.find(c => c.toLowerCase() === cmd) };
    }

    if (comodos[locais.local]?.conexoes.some(c => c.toLowerCase() === cmd)) {
        return { tipo: "mover", destino: comodos[locais.local].conexoes.find(c => c.toLowerCase() === cmd) };
    }

    if (cmd.startsWith("examinar ")) {
        const nomeObjeto = cmd.replace("examinar ", "");
        const objetos = comodos[locais.local]?.objetos || {};
        const objeto = objetos[nomeObjeto];

        if (!objeto) {
            return { tipo: "mensagem", sucesso: false, mensagem: "Não há nada com esse nome aqui." };
        }

        let mensagem = objeto.descricao;
        if (objeto.itens.length > 0) {
            mensagem += ` Você vê: ${objeto.itens.join(", ")}.`;
        }
        return { tipo: "mensagem", sucesso: true, mensagem };
    }

    if (cmd.startsWith("pegar ")) {
        const nomeItem = cmd.replace("pegar ", "");
        const objetos = comodos[locais.local]?.objetos || {};

        for (const [nomeObjeto, dados] of Object.entries(objetos)) {
            const indice = dados.itens.findIndex(i => i.toLowerCase() === nomeItem);
            if (indice !== -1) {
                const item = dados.itens.splice(indice, 1)[0];
                if (!inventorio.includes(item)) {
                    inventorio.push(item);
                }
                return {
                    tipo: "mensagem",
                    sucesso: true,
                    mensagem: `Você pegou ${item} da ${nomeObjeto}.`
                };
            }
        }

        return { tipo: "mensagem", sucesso: false, mensagem: "Esse item não está disponível aqui." };
    }

    return null;
}
