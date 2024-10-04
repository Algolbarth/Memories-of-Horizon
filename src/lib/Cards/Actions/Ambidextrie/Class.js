import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Ambidextrie extends Action {
    name = "Ambidextrie";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);

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
                if (target == undefined && card.type == "Créature" && card.stat("Maniement").value() == 1) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.stat("Maniement").add++;
        this.move("Défausse");
        this.pose();
    };
}