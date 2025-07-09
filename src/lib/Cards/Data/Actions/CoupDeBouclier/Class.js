import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CoupDeBouclier extends Action {
    name = "Coup de bouclier";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    select = function () {
        let check = false;

        for (const card of this.owner.zone("Terrain").cards) {
            if (!check && card.type == "Créature") {
                check = true;
            }
        }

        if (check) {
            if (this.owner == this.System.game.player) {
                this.System.game.use.set(this, Use);
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
        }
    };

    useEffect = function (target) {
        let value = 0;

        for (const card of this.owner.zone("Terrain").cards) {
            if (card.type == "Créature" && value < card.stat("Défense").value()) {
                value = card.stat("Défense").value();
            }
        }

        target.damage(2 * value);

        this.move("Défausse");
        this.pose();
    };
}