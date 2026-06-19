import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import { ambientes, estado } from "./ambientes/index.js";
import escreva from "./src/saida.js";
import leia from "./src/entrada.js";
import desenharArte from "./src/artes.js";

export async function iniciarJogo() {
    let jogando = true;
    console.clear();

    while (jogando) {
        const ambiente = ambientes[estado.ambienteAtual];

        escreva(`\n=== ${estado.ambienteAtual} ===`, "blue");
        escreva(ambiente.texto, "white");

        escreva("\nOpções:", "yellow");
        escreva("[1] - Mudar de ambiente / Mostrar Mapa", "cyan");
        
        let acoesMapeadas = {};
        let indexAcao = 2; // Começa em 2, pois o 1 é o Mapa

        // O motor separa automaticamente as ações dos destinos
        for (const [chave, opcao] of Object.entries(ambiente.opcoes)) {
            if (opcao.acao) {
                acoesMapeadas[indexAcao] = opcao;
                escreva(`[${indexAcao}] - ${opcao.texto}`, "green");
                indexAcao++;
            }
        }

        escreva("\nO que você deseja fazer?", "red");
        let escolha = await leia("> ");

        if (escolha === "1") {
            console.clear();
            escreva(`
 ESTRADA PRINCIPAL
       [ == ENTRADA == ]
               |
      _________|_________
     |                   |
     |   [ CASA SEDE ]   |
     |___________________|
      |                 |
______|_______     _____|______
|            |    |           |
| [CELEIRO]  |    | [ HORTA ] |
|____________|    |___________|
      |                 |
______|______     ______|______
|           |     |           |
| [PASTO 1] |     | [PASTO 2] |
|___________|     |___________|
      |_________________|
          ( CERCADO )
`, "cyan");
            escreva("Legenda:", "gray");
            escreva("🏠 Casa (Centro Topo)  | 🐄 Celeiro (Esq) | 🍅 Horta (Dir)", "white");
            escreva("🌿 Pasto 01 (Esq Baixo)| 🌳 Pasto 02 (Dir) | 🐮 Cercado (Fundo)\n", "white");
            
            escreva("Para onde você deseja ir?", "yellow");
            
            let destinosGlobais = {};
            let indexDestinoGlobal = 1;

            for (const nomeAmbiente of Object.keys(ambientes)) {
                if (nomeAmbiente !== estado.ambienteAtual) {
                    destinosGlobais[indexDestinoGlobal] = nomeAmbiente;
                    escreva(`[${indexDestinoGlobal}] - Ir para ${nomeAmbiente}`, "green");
                    indexDestinoGlobal++;
                }
            }
            escreva("[0] - Voltar\n", "red");

            const escolhaDestino = await leia("Escolha o destino > ");
            
            if (escolhaDestino === "0") {
                console.clear();
            } else if (destinosGlobais[escolhaDestino]) {
                estado.ambienteAtual = destinosGlobais[escolhaDestino];
                console.clear();
            } else {
                escreva("\nOpção inválida!\n", "red");
                await leia("Pressione ENTER para continuar...", "cyan");
                console.clear();
            }
        } else if (acoesMapeadas[escolha]) {
            const opcaoEscolhida = acoesMapeadas[escolha];
            console.clear();
            if (opcaoEscolhida.arte) {
                desenharArte(opcaoEscolhida.arte);
            }
            escreva(`\n[!] ${await opcaoEscolhida.acao()}\n\n`, "magenta");
            await leia("Pressione ENTER para continuar...", "cyan");
            console.clear();
        } else if (escolha === "sair") {
            jogando = false;
        } else {
            escreva("\nOpção inválida! Tente novamente.", "bgRed");
        }
    }
}
