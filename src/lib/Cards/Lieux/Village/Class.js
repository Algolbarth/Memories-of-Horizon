import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Village extends Lieu {
    name = "Village";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.level <= 5) {
            return true;
        }
        return false;
    };
}