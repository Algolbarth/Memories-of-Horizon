import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class EpeeDeFer extends Equipment {
    name = "Épée de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Arme");

        this.equipStat("Attaque").base = 50;

        this.text = Text;
    };
}