import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Affaiblissement extends Action {
    name = "Affaiblissement";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
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
        target.stat("Attaque").add -= 20;
        this.move("Défausse");
        this.pose();
    };
}