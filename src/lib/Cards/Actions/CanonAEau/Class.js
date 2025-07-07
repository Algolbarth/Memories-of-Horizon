import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CanonAEau extends Action {
    name = "Canon à eau";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);

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
        let value = 100;

        value += 2 * this.owner.ressource("Eau").total();
        this.owner.ressource("Eau").spend(this.owner.ressource("Eau").total());

        target.damage(value);

        this.move("Défausse");
        this.pose();
    };
}