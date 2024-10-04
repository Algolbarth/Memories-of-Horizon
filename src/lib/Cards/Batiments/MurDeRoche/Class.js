import { Batiment } from '../Batiment.js';

export class MurDeRoche extends Batiment {
    name = "Mur de roche";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Terre", 25]]);
        this.stat("Vie").base = 100;
        this.stat("Vie").current = 100;
    };
}