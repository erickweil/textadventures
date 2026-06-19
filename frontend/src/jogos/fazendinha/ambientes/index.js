import casa from "./casa.js";
import celeiro from "./celeiro.js";
import horta from "./horta.js";
import pasto01 from "./pasto01.js";
import cercado from "./cercado.js";
import pasto02 from "./pasto02.js";

export const ambientes = {
    Casa: casa,
    Celeiro: celeiro,
    Horta: horta,
    Pasto01: pasto01,
    Cercado: cercado,
    Pasto02: pasto02
};

export const estado = {
    ambienteAtual: "Casa"
};
