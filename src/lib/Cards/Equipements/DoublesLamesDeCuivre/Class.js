import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class DoublesLamesDeCuivre extends Equipment {
    name = "Doubles lames de cuivre";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.equipStat("Multicoup").base = 1;

        this.text = Text;
    };
}