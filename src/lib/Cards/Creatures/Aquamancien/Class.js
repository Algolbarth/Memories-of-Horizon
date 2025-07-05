import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Aquamancien extends Creature {
    name = "Aquamancien";

    constructor(System) {
        super(System);

        this.init([["Or", 12], ["Eau", 12]]);
        this.familles.base.push("Ondin");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.elements.total().includes("Eau") && card.owner == this.owner) {
            this.owner.ressource("Eau").stock += 1;
        }
    };
}