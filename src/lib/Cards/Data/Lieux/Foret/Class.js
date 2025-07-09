import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Foret extends Lieu {
    name = "Forêt";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Végétal", 15]]);

        this.text = Text;
    };

    condition = function (card) {
        if (card.elements.total().includes("Végétal")) {
            return true;
        }
        return false;
    };
}