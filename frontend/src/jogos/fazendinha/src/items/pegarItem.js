import inventorio from "../inventorio/inventorio.js";

export default function pegar(item) {
    if (!inventorio.includes(item)) {
        inventorio.push(item);
        return true;
    }
    return false
}
