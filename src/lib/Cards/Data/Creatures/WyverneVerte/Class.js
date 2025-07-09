import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class WyverneVerte extends Creature {
    name = "Wyverne verte";

    constructor(System) {
        super(System);

        this.level = 3;
        this.init([["Or", 30], ["Végétal", 30]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 35;
        this.stat("Vie").current = 35;
        this.stat("Attaque").base = 20;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Boutique" && card.owner == this.owner && card.elements.total().includes("Végétal")) {
            this.coutReduce(6);
        }
    };
}