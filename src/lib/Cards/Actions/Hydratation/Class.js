import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Hydratation extends Action {
    name = "Hydratation";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Eau", 8]]);

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
        value = 15;

        if (this.owner.ressource("Eau").total() >= 15) {
            this.owner.ressource("Eau").spend(15);
            value = 30;
        }

        target.stat("Vie").add += value;
        target.stat("Vie").current += value;
        target.stat("Attaque").add += value;

        this.move("Défausse");
        this.pose();
    };
}