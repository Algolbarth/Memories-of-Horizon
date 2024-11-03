import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Desarmer extends Action {
    name = "Désarmer";

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
                if (target == undefined && card.type == "Créature" && card.equipments.length > 0) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        for (const equipment of target.equipments) {
            equipment.destroy();
        }
        this.move("Défausse");
        this.pose();
    };
}