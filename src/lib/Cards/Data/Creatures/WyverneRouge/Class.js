import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class WyverneRouge extends Creature {
    name = "Wyverne rouge";

    constructor(System) {
        super(System);

        this.level = 3;
        this.init([["Or", 30], ["Feu", 30]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 40;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Boutique" && card.owner == this.owner && card.elements.total().includes("Feu")) {
            this.coutReduce(6);
        }
    };
}