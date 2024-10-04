import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Ville extends Lieu {
    name = "Ville";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.elements.includes("Neutre")) {
            return true;
        }
        return false;
    };
}