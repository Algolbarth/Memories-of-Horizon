import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Croissance extends Action {
    name = "Croissance";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Végétal", 25]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
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
        target.stat("Attaque").add += 50;
        target.stat("Vie").add += 50;
        target.stat("Vie").current += 50;
        this.move("Défausse");
        this.pose();
    };
}