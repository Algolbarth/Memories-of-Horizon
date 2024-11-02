import { Batiment } from '../Batiment.js';
import Text from './Text.svelte';

export class PuitDeMana extends Batiment {
    name = "Puit de mana";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Potion de mana").add("Main");
        }
    };
}