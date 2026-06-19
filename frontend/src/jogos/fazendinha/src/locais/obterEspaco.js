import campos from "../campos/campos.js";
import comodos from "../comodos/comodos.js";

export default function obterEspaco(local) {
    if (campos[local]) return "campo";
    if (comodos[local]) return "casa";
    return "desconhecido";
}
