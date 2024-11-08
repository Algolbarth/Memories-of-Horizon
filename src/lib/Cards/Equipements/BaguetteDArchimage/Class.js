import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BaguetteDArchimage extends Equipment {
    name = "Baguette d'archimage";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.equipStat("Magie").base = 100;

        this.text = Text;
    };
}