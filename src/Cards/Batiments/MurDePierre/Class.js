import { Batiment } from '../Batiment.js';

export class MurDePierre extends Batiment {
    name = "Mur de pierre";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Terre", 12]]);
        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
    };
}