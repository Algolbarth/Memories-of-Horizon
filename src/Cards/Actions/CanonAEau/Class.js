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

    use = function () {
        this.select();
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
        }
    };

    useEffect = function (target) {
        if (this.owner.ressource("Eau").total() >= 50) {
            this.owner.ressource("Eau").spend(50);
            target.damage(200);
        }
        else {
            target.damage(100);
        }
        this.move("Défausse");
        this.pose();
    };
}