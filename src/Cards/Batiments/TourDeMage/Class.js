import { Batiment } from '../Batiment.js';

export class TourDeMage extends Batiment {
    name = "Tour de mage";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Magie").base = 10;
    };
}