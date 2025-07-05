import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class BouclierEnCuir extends Equipment {
    name = "Bouclier en cuir";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);
        this.familles.base.push("Armure");
        
        this.equipStat("Défense").base = 5;

        this.text = Text;
    };
}