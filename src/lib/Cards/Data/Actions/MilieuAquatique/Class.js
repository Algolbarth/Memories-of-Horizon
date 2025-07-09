import { copy } from '../../../../Utils';
import { Action } from '../Action.js';
import Text from './Text.svelte';

export class MilieuAquatique extends Action {
    name = "Milieu aquatique";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let value = 5;
        if (this.owner.ressource("Eau").total() >= 50) {
            this.owner.ressource("Eau").spend(50);
            value = 10;
        }

        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature" && card.elements.total().includes("Eau")) {
                card.stat("Vie").add += value;
                card.stat("Vie").current += value;
                card.stat("Attaque").add += value;
            }
        }

        this.move("Défausse");
        this.pose();
    };
}