import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Metamorphose extends Action {
    name = "Métamorphose";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Druide");

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
                if (target == undefined && card.type == "Créature" && card.familles.base.includes("Druide")) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.transform(target.otherForm);
        this.move("Défausse");
        this.pose();
    };
}