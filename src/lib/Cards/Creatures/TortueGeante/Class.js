import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class TortueGéante extends Creature {
    name = "Tortue géante";

    constructor(System) {
        super(System);

        this.init([["Or", 18], ["Eau", 18]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 15;
        this.stat("Vie").current = 15;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 5;

        this.text = Text;
    };

    dieEffect = function () {
        this.owner.getCard("Carapace de tortue").add("Main");
    };
}