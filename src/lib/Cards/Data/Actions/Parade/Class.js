import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Parade extends Action {
    name = "Parade";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
        }
        else {
            let target = undefined;

            for (const card of this.owner.zone("Terrain").cards) {
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
        target.stat("Esquive").current += 1;
        this.move("Défausse");
        this.pose();
    };
}