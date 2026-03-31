//const prompt = require("prompt-sync")();
//const readline = require('readline')
//const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
import { console, prompt, process, rl } from "../../mockConsole";
import { inventario, adicionarItem, mostrarInventario, inventarioFase2, adicionarItemFase2, mostrarInventarioFase2 } from "./inventario";
import { creditos, mostrarCreditos } from './creditos.js';
import { Fase1 } from "./fase-1.js";
import { Fase2 } from "./fase-2.js";

export function oExperimento() {
    return new Promise((resolve, reject) => {

        console.log("\n======= O PORÃO =======")
        console.log("Você abre os olhos com certa dificuldade, vislumbrando um cômodo mal iluminado...")
        console.log("Sua perna está firmemente amarrada ao pé de uma mesa por uma corda.")

        let fase2Ativa = false
        let jogoEncerrado = false

        let processarComandoFase2 = null

        const processarComandoFase1 = Fase1(rl, () => {
            fase2Ativa = true
            console.log("\n[Transicionando para a próxima fase...]\n")
            processarComandoFase2 = Fase2(rl, () => {
                jogoEncerrado = true
                mostrarCreditos(creditos)
                resolve()
            })
        })

        function perguntar() {
            if (jogoEncerrado) return

            console.log("\nAções: N, S, L, O, olhar [item], pegar [item], usar [item], inventario, sair")

            rl.question("> ", (input) => {
                const comandoOriginal = input.trim().toLowerCase()

                if (comandoOriginal === "sair") {
                    console.log("Saindo do jogo...")
                    process.exit();
                }

                if (fase2Ativa) {
                    if (processarComandoFase2) {
                        processarComandoFase2(comandoOriginal);
                    }
                } else {
                    processarComandoFase1(comandoOriginal)
                }

                if (!jogoEncerrado) {
                    perguntar()
                }
            })
        }

        perguntar()
    })
}