import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BaguetteDeMage extends Equipment {
    name = "Baguette de mage";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.equipStat("Magie").base = 25;

        this.text = Text;
    };
}