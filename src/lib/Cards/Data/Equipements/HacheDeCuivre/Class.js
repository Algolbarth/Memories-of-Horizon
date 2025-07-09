import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class HacheDeCuivre extends Equipment {
    name = "Hache de cuivre";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Arme");

        this.equipStat("Adresse").base = 20;

        this.text = Text;
    };
}