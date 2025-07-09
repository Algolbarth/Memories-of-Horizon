import { copy } from '../../../Utils/Class.js';
import { Action } from '../Action.js';
import Text from './Text.svelte';

export class TourneeGenerale extends Action {
    name = "Tournée générale";

    constructor(System) {
        super(System);

        this.init([["Or", 120]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let number = 0;
        let terrain = copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                number++;
            }
        }
        for (let i = 0; i < number; i++) {
            this.owner.getCard("Bière").add("Main");
        }

        this.move("Défausse");
        this.pose();
    };
}