import { Sort } from '../Sort.js';
import Text from './Text.svelte';

export class PluieDeFeu extends Sort {
    name = "Pluie de feu";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Feu", 15]]);
        this.familles.base.push("Sort");

        this.text = Text;
    };

    use = function () {
        if (this.owner == this.System.game.player || this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let damage;
        if (this.owner.ressource("Mana").total() >= this.manaCost(25)) {
            this.owner.ressource("Mana").spend(this.manaCost(25));
            damage = 10;
        }
        else {
            damage = 5;
        }

        let terrain = this.System.copy(this.owner.adversary().zone("Terrain").cards);
        for (const card of terrain) {
            card.damage(damage);
        }

        this.move("Défausse");
        this.pose();
    };
}