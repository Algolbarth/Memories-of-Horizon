import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Bucheron extends Creature {
    name = "Bûcheron";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Végétal", 20]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    otherDieEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.includes("Végétal")) {
            this.stat("Attaque").add += 2;
            this.owner.ressource("Végétal").stock += 1;
        }
    };
}