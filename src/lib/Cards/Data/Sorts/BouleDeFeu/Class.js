import { Sort } from '../Sort.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class BouleDeFeu extends Sort {
    name = "Boule de feu";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Feu", 10]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
        }
    };

    useEffect = function (target) {
        if (this.owner.ressource("Mana").total() >= this.manaCost(15)) {
            this.owner.ressource("Mana").spend(this.manaCost(15));
            target.damage(60);
        }
        else {
            target.damage(30);
        }
        this.move("Défausse");
        this.pose();
    };
}