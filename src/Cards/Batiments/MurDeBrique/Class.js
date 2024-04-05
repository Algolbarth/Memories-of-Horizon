import { Batiment } from '../Batiment.js';

export class MurDeBrique extends Batiment {
    name = "Mur de brique";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
    };
}