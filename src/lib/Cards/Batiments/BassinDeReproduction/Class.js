import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class BassinDeReproduction extends Batiment {
    name = "Bassin de reproduction";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Eau", 20]]);
        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;

        this.text = Text;
    };

    turnEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Ondin").add("Terrain");
        }
    };
}