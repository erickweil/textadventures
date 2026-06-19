//import { createInterface } from 'node:readline/promises';
import { console, prompt, process, rlPromises as term } from "../../mockConsole";

import { finais } from './finais.js';
import { getChalk } from "../../utils/chalk.js";
import { getSalasJogo } from "./salas.js";

export async function attNotHuman() {

const estadoJogo = {
    noite: false,
    energia: 0,
    dias: 0,

    fala_pessoa: 0,

    pessoa_cozinha: false,
    pessoa_despensa: false,
    pessoa_banheiro: false,

    eMonstroCozinha: 0,
    eMonstroDespensa: 0,
    eMonstroBanheiro: 0,

    humano_morto: 0,
    visitante_morto: 0,

    salaAtual: "Quarto",
    porta_aberta: false,
    terminou: false
}

let chalk = getChalk(true);
/*const term = createInterface({
    input: process.stdin,
    output: process.stdout
});*/

//Definição de cada sala;
const salas = {
    ...getSalasJogo(estadoJogo)
}

const DIVISOR_MAIOR = chalk.cyan('═'.repeat(60));
const DIVISOR_MENOR = chalk.cyan('─'.repeat(60));

//Função principal assíncrona para rodar o loop do jogo;
async function iniciarJogo() {

    console.log(DIVISOR_MAIOR);
    console.log(chalk.bold.yellow("╔══════════════════════════════════════════════════╗"));
    console.log(chalk.bold.yellow("║     BEM-VINDO AO 'NÃO EU NÃO SOU UM HUMANO'      ║"));
    console.log(chalk.bold.yellow("║              (EDIÇÃO DE TERMINAL)                ║"));
    console.log(chalk.bold.yellow("╚══════════════════════════════════════════════════╝"));
    console.log(DIVISOR_MAIOR);

    console.log(chalk.bgRed.bold('\n ⚠️  AVISO DE CONTEÚDO\n'));
    console.log(chalk.italic.cyan(
        ' • Este jogo possui uma narrativa de terror psicológico.\n'
    ));
    console.log(chalk.italic.cyan(
        ' • Você é um personagem que vive sozinho em uma casa e começa\n' +
        '   a receber visitas "misteriosas" durante a noite.\n'
    ));
    console.log(chalk.italic.cyan(
        ' • O objetivo é sobreviver por 5 dias.\n'
    ));
    console.log(chalk.italic.cyan(
        ' • Há 4 finais possíveis!\n'
    ));

    console.log(DIVISOR_MENOR);
    console.log(`${chalk.bold.cyan('\n📋 COMANDOS BÁSICOS:\n')}\n
    ${chalk.yellow('   Digite o nome da ação listada para interagir com o ambiente.')}\n
    ${chalk.yellow('   Digite "encerrar" para encerrar o jogo (seu progresso é perdido).')}\n`);

    console.log(chalk.bold.cyan('💡 DICAS IMPORTANTES:\n'));
    console.log(chalk.yellow(
        '   • Explore o ambiente e tente entender o que está acontecendo.\n' +
        '   • Você pode falar e observar pessoas ao custo de energia.\n' +
        '   • Ao atender a porta, a pessoa entra imediatamente na casa.\n' +
        '   • Cada ação consome sua energia disponível.\n'
    ));
    console.log(DIVISOR_MAIOR);

    //Loop que mantém o jogo rodando até o jogador vencer, morrer ou sair;
    while (true) {

        //Onde o jogador está.
        const sala = salas[estadoJogo.salaAtual];

        //Se a sala não existir, o jogo para;
        if (!sala) {
            console.log("Erro: Você saiu do mapa!");
            break;
        }

        //Exibe o horário, o dia atual e a energia para o jogador;
        if (estadoJogo.noite) {
            console.log(DIVISOR_MENOR);
            console.log(`\n${chalk.green.bold("\n--- NOITE DO DIA ", estadoJogo.dias, " ---")}\n
            ${chalk.magenta.bold("\nEnergia: ", estadoJogo.energia)}\n`);
        } else {
            console.log(DIVISOR_MENOR);
            console.log(`${chalk.green.bold("\n--- DIA ", estadoJogo.dias, " ---")}
            ${chalk.magenta.bold("\nEnergia: ", estadoJogo.energia)}\n`);
        }

        //Executa a descrição da sala atual;
        sala.descricao();

        //Lista todas as ações disponíveis para o jogador;
        console.log("\nAções disponíveis:");
        for (const acao in sala.conexoes) {
            console.log(chalk.white.bold(` - ${acao}`));
        }

        //Aguarda o jogador digitar um comando no terminal;
        const comando = await term.question(chalk.white.bold("\nO que você deseja fazer? > "));
        //Se o jogador não digitar nada ou fechar o terminal, encerra o jogo;
        if (!comando) {
            console.log("isto não é um comando válido.");
        }

        //Normaliza o comando para letras minúsculas sem espaços adicionais para evitar erros de digitação;
        const acaoEscolhida = comando.toLowerCase().trim();

        //Verifica se a ação digitada existe nas conexões da sala atual;
        const resultadoAcao = sala.conexoes[acaoEscolhida];

        if (resultadoAcao) {

            //Executa a função da ação;
            const novoDestino = resultadoAcao();

            //Se a ação retornou uma string, atualizamos a sala atual para mover o jogador.
            if (typeof novoDestino === "string") {
                estadoJogo.salaAtual = novoDestino;
            }

        } else {

            //Caso o comando não seja reconhecido ou digitado errado.
            console.log("\n[!] Comando inválido. Tente uma das ações listadas.");
        }

        //Define a probabilidade de cada "pessoa" ser um visitante (Apenas se a pessoa exisir e se ainda não estiver definida)#;
        //#Cozinha;
        if (estadoJogo.pessoa_cozinha && estadoJogo.eMonstroCozinha == 0) {
            estadoJogo.eMonstroCozinha = Math.random();

        } else {
            estadoJogo.eMonstroCozinha = estadoJogo.eMonstroCozinha;

        }

        //#Despensa;
        if (estadoJogo.pessoa_despensa && estadoJogo.eMonstroDespensa == 0) {
            estadoJogo.eMonstroDespensa = Math.random();

        } else {
            estadoJogo.eMonstroDespensa = estadoJogo.eMonstroDespensa;

        }

        //#Banheiro;
        if (estadoJogo.pessoa_banheiro && estadoJogo.eMonstroBanheiro == 0) {
            estadoJogo.eMonstroBanheiro = Math.random();

        } else {
            estadoJogo.eMonstroBanheiro = estadoJogo.eMonstroBanheiro;
        }
        if (acaoEscolhida === "encerrar") {
            console.log("\nVOCÊ ESCOLHEU ENCERRAR O JOGO!");
            estadoJogo.terminou = true;
        }
        finais(estadoJogo);
        if (estadoJogo.terminou) {
            break;
        }
    }

    console.log("\nObrigado por jogar!");
    term.close();

}
// 33. Chama a função para iniciar o jogo.
await iniciarJogo();

}