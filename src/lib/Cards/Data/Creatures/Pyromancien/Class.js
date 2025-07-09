import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Pyromancien extends Creature {
    name = "Pyromancien";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Feu", 12]]);
        this.familles.base.push("Gobelin");

        this.stat("Vie").base = 3;
        this.stat("Vie").current = 3;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Feu") && card.owner == this.owner) {
            this.stat("Attaque").add += 5;
        }
    };
}