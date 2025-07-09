export function copy(array) {
    let tab = [];
    for (const element of array) {
        tab.push(element);
    }
    return tab;
};

export function shuffle(array) {
    let i = array.length;
    while (i != 0) {
        let j = Math.floor(Math.random() * i);
        i--;

        [array[i], array[j]] = [array[j], array[i]];
    }
};

export function several(value, name) {
    let text = "";
    text += value + " " + name;
    if (value > 1) {
        text += "s";
    }
    return text;
};