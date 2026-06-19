import { console, prompt, process, rlPromises as term } from "../../mockConsole";
export const ilhas = {
    Dawn_Island: {
        descricao: () => {
            console.log("Voce esta na Ilha do Alvorecer, uma vila tranquila com casas de madeira e cheiro de mar.");
        },
        conexoes: {
            s: () => "Shells_Town",
            l: () => "Goat_Island",
        }
    },
    Goat_Island: {
        descricao: () => {
            console.log("Voce esta na Ilha das Cabras, onde cabras soltas pastam entre rochas e arbustos.");
        },
        conexoes: {
            o: () => "Dawn_Island",
            l: () => "Orange_Town",
        }
    },
    Shells_Town: {
        descricao: () => {
            console.log("Voce esta em Shells Town, uma cidade portuaria com marinheiros e barracas de conchas.");
        },
        conexoes: {
            n: () => "Dawn_Island",
            l: () => "Syrup_Vilage",
            o: () => "Gecko_Island",
        }
    },
    Orange_Town: {
        descricao: () => {
            console.log("Voce esta em Orange Town, uma cidade colorida cercada por laranjeiras e palhacos de circo.");
        },
        conexoes: {
            o: () => "Goat_Island",
            s: () => "Arlong_Park",
        }
    },
    Syrup_Vilage: {
        descricao: () => {
            console.log("Voce esta na Vila Syrup, uma vila pacata com uma mansao no alto de um penhasco.");
        },
        conexoes: {
            n: () => "Fraunce_Kingdom",
            o: () => "Shells_Town",
        }
    },
    Gecko_Island: {
        descricao: () => {
            console.log("Voce esta na Ilha Gecko, uma ilha deserta com areia quente e lagartos por toda parte.");
        },
        conexoes: {
            l: () => "Shells_Town",
        }
    },
    Fraunce_Kingdom: {
        descricao: () => {
            console.log("Voce esta no Reino Fraunce, um castelo imponente com bandeiras tremulando ao vento.");
        },
        conexoes: {
            s: () => "Syrup_Vilage",
        }
    },
    Arlong_Park: {
        descricao: () => {
            console.log("Voce esta no Arlong Park, uma fortaleza sobre pilares no meio do oceano.");
        },
        conexoes: {
            n: () => "Orange_Town",
        }
    }
};

export function gerarFrutaMagica() {
    return Math.random() < 0.67;
}

export function gerarTesouro() {
    const lista = Object.keys(ilhas);
    const max = lista.length;
    const num = Math.floor(Math.random() * (max));
    const ilha = lista[num];
    return ilha;
}

export function gerarChave(ilhaComTesouro) {
    const lista = Object.keys(ilhas);
    const max = lista.length;
    let num = Math.floor(Math.random() * (max));

    while(num === lista.indexOf(ilhaComTesouro)) {
        num = Math.floor(Math.random() * (max));
    }

    const ilha = lista[num];
    return ilha;
}