import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ElementaireExplosif extends Creature {
    name = "Élémentaire explosif";

    constructor(System) {
        super(System);

        this.init([["Feu", 50]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 50;

        this.text = Text;
    };

    dieEffect = function () {
        if (this.owner.ressource("Feu").max >= 5) {
            this.owner.ressource("Feu").max -= 5;
            let terrain = this.System.copy(this.owner.adversary().zone("Terrain").cards);
            for (const card of terrain) {
                card.damage(5);
            }
        }
    };
}