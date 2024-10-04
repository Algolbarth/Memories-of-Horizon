import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Volcan extends Lieu {
    name = "Volcan";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Feu", 15]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.elements.includes("Feu")) {
            return true;
        }
        return false;
    };
}