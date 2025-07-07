import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class BaguetteEnBois extends Equipment {
    name = "Baguette en bois";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Arme");

        this.equipStat("Magie").base = 5;

        this.text = Text;
    };
}