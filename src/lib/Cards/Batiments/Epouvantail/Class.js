import { Batiment } from '../Batiment.js';

export class Epouvantail extends Batiment {
    name = "Épouvantail";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.stat("Vie").base = 1;
        this.stat("Vie").current = 1;
        this.stat("Protection").base = 2;
    };
}