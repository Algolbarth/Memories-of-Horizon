import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BouclierDeFer extends Equipment {
    name = "Bouclier de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.equipStat("Défense").base = 25;

        this.text = Text;
    };
}