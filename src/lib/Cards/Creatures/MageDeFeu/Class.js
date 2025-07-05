import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class MageDeFeu extends Creature {
    name = "Mage de feu";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Feu", 20]]);
        this.familles.base.push("Gobelin");

        this.stat("Vie").base = 3;
        this.stat("Vie").current = 3;
        this.stat("Attaque").base = 20;
        this.stat("Magie").base = 5;

        this.text = Text;
    };

    otherPoseEffect = function (card) {
        if (this.zone.name == "Terrain" && card.familles.total().includes("Sort") && card.owner == this.owner && this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.owner.adversary().zone("Terrain").cards[0].damage(5);
        }
    };
}