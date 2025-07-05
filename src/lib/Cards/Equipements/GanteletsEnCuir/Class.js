import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class GanteletsEnCuir extends Equipment {
    name = "Gantelets en cuir";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Armure");
        
        this.equipStat("Actions").base = 1;

        this.text = Text;
    };
}