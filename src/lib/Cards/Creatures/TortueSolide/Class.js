import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class TortueSolide extends Creature {
    name = "Tortue solide";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Eau", 15]]);
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