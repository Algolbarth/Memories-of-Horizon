import { copy } from '../../../../Utils';
import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Autodafe extends Action {
    name = "Autodafé";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Feu", 15]]);

        this.text = Text;
    };

    select = function () {
        if (this.owner.zone("Boutique").cards.length > 0 && (this.owner == this.System.game.player || this.owner.adversary().zone("Terrain").cards.length > 0)) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let value = 0;

        let shop = copy(this.owner.zone("Boutique").cards);
        for (const card of shop) {
            card.destroy();
            value++;
        }

        let terrain = copy(this.owner.adversary().zone("Terrain").cards);
        for (const card of terrain) {
            card.damage(value);
        }

        this.move("Défausse");
        this.pose();
    };
}