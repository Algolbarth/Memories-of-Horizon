import { Sort } from '../Sort.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class PeauDEcorce extends Sort {
    name = "Peau d'écorce";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Végétal", 10]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
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
            target.stat("Vie").add += 45;
        }
        else {
            target.stat("Vie").add += 20;
        }
        this.move("Défausse");
        this.pose();
    };
}