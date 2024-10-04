import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Noyade extends Action {
    name = "Noyade";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Eau", 20]]);

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
            let target = undefined;

            for (const card of this.owner.adversary().zone("Terrain").cards) {
                if (target == undefined && card.type == "Créature") {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.destroy();
        this.move("Défausse");
        this.pose();
    };
}