import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Cibler extends Action {
    name = "Cibler";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);

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
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.stat("Protection").add++;
        this.move("Défausse");
        this.pose();
    };
}