import { Action } from '../Action.js';
import Text from './Text.svelte';

export class PluieDeFleche extends Action {
    name = "Pluie de flèche";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player || this.owner.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let terrain = copy(this.owner.adversary().zone("Terrain").cards);
        for (const card of terrain) {
            card.damage(5);
        }
        this.move("Défausse");
        this.pose();
    };
}