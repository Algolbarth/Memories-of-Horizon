import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Bagarreur extends Creature {
    name = "Bagarreur";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.owner) {
            card.stat("Attaque").step += 5;
        }
    };
}