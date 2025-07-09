import { Batiment } from '../Batiment.js';

export class Bibliothèque extends Batiment {
    name = "Bibliothèque";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Intelligence").base = 5;
    };
}