import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class Egide extends Equipment {
    name = "Égide";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Armure");
        
        this.equipStat("Protection").base = 1;

        this.text = Text;
    };
}