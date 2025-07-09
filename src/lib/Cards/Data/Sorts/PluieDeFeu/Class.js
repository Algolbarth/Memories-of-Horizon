import { copy } from '../../../../Utils';
import { Sort } from '../Sort.js';
import Text from './Text.svelte';

export class PluieDeFeu extends Sort {
    name = "Pluie de feu";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Feu", 25]]);
        this.familles.base.push("Sort");

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let damage;
        if (this.owner.ressource("Mana").total() >= this.manaCost(50)) {
            this.owner.ressource("Mana").spend(this.manaCost(50));
            damage = 20;
        }
        else {
            damage = 10;
        }

        let terrain = copy(this.owner.adversary().zone("Terrain").cards);
        for (const card of terrain) {
            card.damage(damage);
        }

        this.move("Défausse");
        this.pose();
    };
}