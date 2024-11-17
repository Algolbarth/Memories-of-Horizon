import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Montagne extends Lieu {
    name = "Montagne";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Terre", 15]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.elements.total().includes("Terre")) {
            return true;
        }
        return false;
    };
}