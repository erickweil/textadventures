let campos = {
    "campo 1": {
        descricao: "O primeiro campo de plantação. A terra parece seca e com mato.",
        situacao: "chao",
        estaIrrigado: false,
        cultura: "",
        podeColher: false,
        conexoes: ["sala de estar", "campo 2", "campo 3"]
    },
    "campo 2": {
        descricao: "O segundo campo de plantação. Há espaço para cultivar.",
        situacao: "chao",
        estaIrrigado: false,
        cultura: "",
        podeColher: false,
        conexoes: ["campo 1"]
    },
    "campo 3": {
        descricao: "O terceiro campo de plantação, mais afastado da casa.",
        situacao: "chao",
        estaIrrigado: false,
        cultura: "",
        podeColher: false,
        conexoes: ["campo 1"]
    }
};

export default campos;
