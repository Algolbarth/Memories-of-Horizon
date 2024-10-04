import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireMarin extends Creature {
    name = "Élémentaire marin";

    constructor(System) {
        super(System);

        this.init([["Eau", 50]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 50;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone == "Terrain" && this.owner.ressource("Eau").total() >= 5) {
            this.owner.ressource("Eau").spend(5);
            this.stat("Attaque").add += 5;
            this.stat("Vie").add += 5;
            this.stat("Vie").current += 5;
        }
    };
}