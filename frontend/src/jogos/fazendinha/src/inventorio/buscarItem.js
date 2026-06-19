import inventorio from "./inventorio.js";

export default function buscar(item) {
    if (inventorio.includes(item)) {
        return true;
    }
    return false;
}
