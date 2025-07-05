import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class CarapaceDeTortue extends Equipment {
    name = "Carapace de tortue";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Eau", 8]]);
        this.familles.base.push("Armure", "Reptile");
        this.equipStat("Défense").base = 15;

        this.text = Text;
    };
}