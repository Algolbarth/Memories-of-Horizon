import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Sage extends Creature {
    name = "Sage";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Intelligence").base = 1;

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.stat("Intelligence").add += 1;
        }
    };
}