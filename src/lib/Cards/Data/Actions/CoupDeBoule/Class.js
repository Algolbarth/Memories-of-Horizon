import { Action } from '../Action.js';
import Text from './Text.svelte';

export class CoupDeBoule extends Action {
    name = "Coup de boule";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);

        this.text = Text;
    };

    select = function () {
        let check = false;

        for (const card of this.owner.zone("Terrain").cards) {
            if (!check && card.type == "Créature") {
                check = true;
            }
        }

        if (check && this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let value = 0;
        let target = this.owner.adversary().zone("Terrain").cards[0];

        for (const card of this.owner.zone("Terrain").cards) {
            if (card.type == "Créature" && value < card.stat("Attaque").value()) {
                value = card.stat("Attaque").value();
            }
        }

        for (const card of this.owner.adversary().zone("Terrain").cards) {
            if (target.stat("Vie").value() < card.stat("Vie").value()) {
                target = card;
            }
        }

        target.damage(value);

        this.move("Défausse");
        this.pose();
    };
}