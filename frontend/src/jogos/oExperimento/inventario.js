import { console } from "../../mockConsole";

export let inventario = []

// Inventário
export function adicionarItem(item) {
    if (!inventario.includes(item)) {
        inventario.push(item)
        console.log(`Você pegou: ${item}`)
    } else {
        console.log(`Você já tem o item: ${item}`)
    }
}

export function mostrarInventario() {
    if (inventario.length === 0) {
        console.log("Você não carrega nada consigo.")
    } else {
        console.log("Você possui:", inventario.join(", "))
    }
}

export function removerItem(item) {
    const index = inventario.indexOf(item)
    if (index > -1) {
        inventario.splice(index, 1)
        console.log(`Você largou: ${item}`)
        return true
    } else {
        console.log(`Você não tem o item: ${item}`)
        return false
    }
}


export let inventarioFase2 = []

// Inventário 2
export function adicionarItemFase2(item) {
    if (!inventarioFase2.includes(item)) {
        inventarioFase2.push(item)
        console.log(`Você pegou: ${item}`)
    } else {
        console.log(`Você já tem o item: ${item}`)
    }
}

export function mostrarInventarioFase2() {
    if (inventarioFase2.length === 0) {
        console.log("Você não carrega nada consigo.")
    } else {
        console.log("Você possui:", inventarioFase2.join(", "))
    }
}

export function removerItemFase2(item) {
    const index = inventarioFase2.indexOf(item)
    if (index > -1) {
        inventarioFase2.splice(index, 1)
        console.log(`Você largou: ${item}`)
        return true
    } else {
        console.log(`Você não tem o item: ${item}`)
        return false
    }
}