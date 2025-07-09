import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Princesse extends Creature {
    name = "Princesse";

    constructor(System) {
        super(System);

        this.init([["Or", 105]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.owner) {
            card.stat("Vie").add += 10;
            card.stat("Vie").current += 10;
            card.stat("Attaque").add += 10;
        }
    };
}