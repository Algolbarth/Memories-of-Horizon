import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Phytomancien extends Creature {
    name = "Phytomancien";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Végétal", 12]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Végétal") && card.owner == this.owner) {
            this.stat("Vie").add += 3;
            this.stat("Vie").current += 3;
        }
    };
}