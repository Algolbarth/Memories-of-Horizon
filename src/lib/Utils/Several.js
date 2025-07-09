export function several(value, name) {
    let text = "";
    text += value + " " + name;
    if (value > 1) {
        text += "s";
    }
    return text;
};