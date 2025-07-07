import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class PasseDArmes extends Action {
    name = "Passe d'armes";

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

            for (const card of this.owner.zone("Terrain").cards) {
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
            equipment.move("Main");
        }
        this.move("Défausse");
        this.pose();
    };
}