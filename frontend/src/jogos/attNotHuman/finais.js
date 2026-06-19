import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import { getChalk } from "../../utils/chalk";

let chalk = getChalk(true);
export function finais(estadoJogo) {
    //& Insano;
    if (estadoJogo.humano_morto > 2) {

        console.log(`${chalk.red.bold("\nVOCÊ MATOU MUITOS HUMANOS!\nVOCÊ ESTÁ PARANÓICO!")}\n
        ${chalk.bgRed.bold("\nFinal 1: Insano\n")}\n
        ${chalk.white.bold("\nVocê sai pelas ruas, atirando em todos os 'monstros' que aparecem.")}
        ${chalk.white.bold("\nEles te cercam... Você é espancado, amarrado e... deixado")}
        ${chalk.white.bold("\nOs visitantes vão terminar o trabalho")}\n
        ${chalk.yellow.bold("\nHumanos mortos: ", estadoJogo.humano_morto)}
        ${chalk.yellow.bold("\nVisitantes mortos: ", estadoJogo.visitante_morto)}`);
        estadoJogo.terminou = true;
    }

    //& Solitário;
    if (estadoJogo.dias >= 3 &&
        !estadoJogo.pessoa_banheiro &&
        !estadoJogo.pessoa_cozinha &&
        !estadoJogo.pessoa_despensa &&
        estadoJogo.noite) {

        console.log(`${chalk.red.bold("\nVOCÊ NÃO DEIXOU NINGUÉM ENTRAR!\nVOCÊ ESTÁ SOZINHO!")}\n
        ${chalk.bgRed.bold("\nFinal 2: Solitário\n")}\n
        ${chalk.white.bold("\nUm ser bate à porta!\n 'Você está sozinho? : ele pergunta")}
        ${chalk.white.bold("\nEle percebe que você está sozinho.")}
        ${chalk.white.bold("\nEle entra, te tortura e deixa sua casa aberta para que os outros terminem o trabalho")}\n
        ${chalk.yellow.bold("\nHumanos mortos: ", estadoJogo.humano_morto)}
        ${chalk.yellow.bold("\nVisitantes mortos: ", estadoJogo.visitante_morto)}`);
        estadoJogo.terminou = true;
    }

    //& Má companhia;
    if (estadoJogo.dias >= 3 &&
        ((estadoJogo.eMonstroBanheiro +
        estadoJogo.eMonstroCozinha +
        estadoJogo.eMonstroDespensa) > 1) &&
        estadoJogo.noite) {

        console.log(`${chalk.red.bold("\nVOCÊ DEIXOU MUITOS DELES ENTRAREM!")}\n
        ${chalk.bgRed.bold("\nFinal 3: Má companhia\n")}\n
        ${chalk.white.bold("\nAs 'pessoas' que você acolheu te cercam...\nVocê é dilacerado vivo e... deixado.")}\n
        ${chalk.yellow.bold("\nHumanos mortos: ", estadoJogo.humano_morto)}
        ${chalk.yellow.bold("\nVisitantes mortos: ", estadoJogo.visitante_morto)}`);
        estadoJogo.terminou = true;

    //& Sobrevivente;
    } else if (estadoJogo.dias >= 5 &&
        ((estadoJogo.eMonstroBanheiro +
        estadoJogo.eMonstroCozinha +
        estadoJogo.eMonstroDespensa) <= 1)) {

        console.log(`${chalk.red.bold("\nVOCÊ CONSEGUIU! SOBREVIVEU")}\n
        ${chalk.bgRed.bold("\nFinal 4: Sobrevivente\n")}\n
        ${chalk.white.bold("\nAs pessoas que você acolheu te cercam...\nVocê é apoiado por elas...")}
        ${chalk.white.bold("\nTodos estão vivos, agora este é um novo mundo, e vocês sabem como sobreviver.")}\n
        ${chalk.yellow.bold("\nHumanos mortos: ", estadoJogo.humano_morto)}
        ${chalk.yellow.bold("\nMonstros mortos: ", estadoJogo.visitante_morto)}`);
        estadoJogo.terminou = true;
    }
}