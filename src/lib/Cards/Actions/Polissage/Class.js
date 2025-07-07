import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Polissage extends Action {
    name = "Polissage";

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

            for (const card of this.owner.zone("Main").cards) {
                if (target == undefined && card.familles.total().includes("Armure")) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.equipStat("Défense").add += 10;
        this.move("Défausse");
        this.pose();
    };
}