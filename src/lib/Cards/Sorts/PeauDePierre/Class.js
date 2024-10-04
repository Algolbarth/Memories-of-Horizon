import { Sort } from '../Sort.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class PeauDePierre extends Sort {
    name = "Peau de pierre";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Terre", 10]]);

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
        if (this.owner.ressource("Mana").total() >= this.manaCost(15)) {
            this.owner.ressource("Mana").spend(this.manaCost(15));
            target.stat("Défense").add += 30;
        }
        else {
            target.stat("Défense").add += 15;
        }
        this.move("Défausse");
        this.pose();
    };
}