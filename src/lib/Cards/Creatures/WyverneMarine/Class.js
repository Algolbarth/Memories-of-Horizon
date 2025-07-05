import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class WyverneMarine extends Creature {
    name = "Wyverne marine";

    constructor(System) {
        super(System);

        this.level = 3;
        this.init([["Or", 30], ["Eau", 30]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Boutique" && card.owner == this.owner && card.elements.total().includes("Eau")) {
            this.coutReduce(6);
        }
    };

    use = function () {
        this.owner.ressource("Eau").current += 10;
        this.move("Terrain");
        this.pose();
    };
}