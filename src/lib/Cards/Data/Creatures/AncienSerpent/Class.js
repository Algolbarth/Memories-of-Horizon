import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class AncienSerpent extends Creature {
    name = "Ancien serpent";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Végétal", 15]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 15;
        this.stat("Vie").current = 15;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.getCard("Mue").add("Main");
        }
    };
}