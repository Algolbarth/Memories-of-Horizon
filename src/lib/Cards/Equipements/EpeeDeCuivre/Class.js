import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class EpeeDeCuivre extends Equipment {
    name = "Épée de cuivre";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);
        this.equipStat("Attaque").base = 10;

        this.text = Text;
    };
}