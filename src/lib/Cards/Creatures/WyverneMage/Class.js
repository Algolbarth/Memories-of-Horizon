import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class WyverneMage extends Creature {
    name = "Wyverne mage";

    constructor(System) {
        super(System);

        this.level = 3;
        this.init([["Or", 60]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Magie").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Boutique" && card.owner == this.owner && card.familles.total().includes("Sort")) {
            this.coutReduce(6);
        }
    };
}