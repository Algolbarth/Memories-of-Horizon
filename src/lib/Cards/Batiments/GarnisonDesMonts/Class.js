import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class GarnisonDesMonts extends Batiment {
    name = "Garnison des monts";

    constructor(System) {
        super(System);

        this.init([["Or", 60], ["Terre", 60]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    turnEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Soldat nain").add("Terrain");
        }
    };
}