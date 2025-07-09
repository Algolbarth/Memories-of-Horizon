import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Mer extends Lieu {
    name = "Mer";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Eau", 15]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.elements.total().includes("Eau")) {
            return true;
        }
        return false;
    };
}