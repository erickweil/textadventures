let comodos = {
    "sala de estar": {
        descricao: "A sala de estar da residência. Há uma estante com ferramentas e a porta da entrada.",
        portaAberta: false,
        objetos: {
            estante: {
                descricao: "Uma estante de madeira com ferramentas de trabalho.",
                itens: ["arado", "chave 1"]
            }
        },
        conexoes: ["campo 1", "cozinha"]
    },
    "cozinha": {
        descricao: "A cozinha da casa. Há um fogão e uma mesa com utensílios.",
        objetos: {
            mesa: {
                descricao: "Uma mesa de madeira com alguns utensílios.",
                itens: []
            }
        },
        conexoes: ["sala de estar"]
    }
};

export default comodos;
