import { console, prompt, process, rlPromises as term } from "../../mockConsole";
import escreva from "./src/saida.js";
import leia from "./src/entrada.js";
import { iniciarJogo } from "./main.js";

export async function fazendinha() {

escreva("=== Inicializando o Jogo ===", "bgBlue");

let nome = await leia("Por favor, digite o seu nome: ", "green");

while (!nome.trim()) {
    escreva("Você precisa digitar um nome para continuar!", "red");
    nome = await leia("Por favor, digite o seu nome: ", "green");
}

escreva(`\nSeja bem-vindo(a) à Fazenda, ${nome}!`);
escreva("Navegue pelos ambientes usando os números das opções.\n");

escreva("=== A SUA HISTÓRIA ===", "magenta");
escreva("Você acaba de chegar à antiga fazenda da sua família.", "white");
escreva("Por muitos anos, este lugar foi cheio de vida, plantações férteis e animais felizes.", "white");
escreva("Porém, o tempo passou e a propriedade acabou ficando coberta de poeira e mato.", "white");
escreva("Agora, sua grande missão é explorar cada canto, encontrar ferramentas esquecidas,", "white");
escreva("cuidar da terra e trazer a antiga glória desta fazenda de volta à vida!\n", "yellow");

escreva(`
───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
───█▒▒░░░░░░░░░▒▒█───
────█░░█░░░░░█░░█────
─▄▄──█░░░▀█▀░░░█──▄▄─
█░░█─▀▄░░░░░░░▄▀─█░░█
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
█░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
█░░║║║╠─║─║─║║║║║║╠─░░█
█░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
`);

await leia("\nPressione ENTER para começar...", "cyan");

await iniciarJogo();

}