import { console } from "../../mockConsole";

export const creditos = [" \n",
        "┌───────────────────────────────────────────────┐\n",
        "│                                               │\n",
        "│           ████ █████████████ ████             │\n",
        "│         ██████ O EXPERIMENTO ██████           │\n",
        "│           ████  — Créditos — ████             │\n",
        "│                                               │\n",
        "├───────────────────────────────────────────────┤\n",
        "\n",
        "Roteiro, Programação, Design, Cenários, Narrativa:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Direção de Cenas e Diálogos Internos:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Inteligência Emocional das Portas Trancadas:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Supervisão dos Fusiveis:\n",
        "> Evelyn do Vale e Julia Alves\n",
        "\n",
        "Controle de Qualidade da Barra de Ferro™:\n",
        "> Evelyn do Vale\n",
        "\n",
        "Efeitos Sonoros Mentais de Explosões:\n",
        "> Julia Alves (e um botijão imaginário)\n",
        "\n",
        "Testes de Sanidade em Ciclos Temporais:\n",
        "> Julia Alves\n",
        "\n",
        "Mente Sombria Por Trás da Voz Misteriosa:\n",
        "> Evelyn do Vale (interpretando ela mesma)\n",
        "\n",
        "QA, Beta Testing e Autotortura Voluntária:\n",
        "> Evelyn do Vale e Julia Alves, algumas centenas de vezes seguidas\n",
        "\n",
        "Emoções Do Jogador? Nenhuma Garantida.\n",
        "Bugs? Se tiver, nós já odiamos eles.\n",
        "\n",
        "┌───────────────────────────────────────────────┐\n",
        "│     Este jogo foi feito com sangue, suor,     │\n",
        "│   e prompts digitados (alguns de madrugada).  │\n",
        "└───────────────────────────────────────────────┘\n",
        "\n",
        "Obrigada por jogar.\n",
        "\n",
        "█ O jogo será encerrado automaticamente █"
    ]

export function escreverLinha(texto, callback) {
    let i = 0
    function escrever() {
        if (i < texto.length) {
        process.stdout.write(texto.charAt(i))
        i++;
        setTimeout(escrever, 50)
        } else {
        process.stdout.write('\n')
        callback()
        }
    }
  escrever()
    }

export function mostrarCreditos(creditos, index = 0) {
        if (index < creditos.length) {
        escreverLinha(creditos[index], () => mostrarCreditos(creditos, index + 1))
        } else {
        console.log("\nEncerrando o jogo...")
        process.exit(0)
        }
    }