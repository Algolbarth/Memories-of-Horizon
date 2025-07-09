export function shuffle(array) {
    let i = array.length;
    while (i != 0) {
        let j = Math.floor(Math.random() * i);
        i--;

        [array[i], array[j]] = [array[j], array[i]];
    }
};