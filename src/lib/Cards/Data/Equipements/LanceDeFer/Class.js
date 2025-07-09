import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class LanceDeFer extends Equipment {
    name = "Lance de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Arme");

        this.equipStat("Attaque").base = 25;
        this.equipStat("Percée").base = 50;

        this.text = Text;
    };
}