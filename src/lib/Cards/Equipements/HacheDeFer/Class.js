import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class HacheDeFer extends Equipment {
    name = "Hache de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Arme");
        
        this.equipStat("Adresse").base = 30;
        this.equipStat("Intensité").base = 1;

        this.text = Text;
    };
}