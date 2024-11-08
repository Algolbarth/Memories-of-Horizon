import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BouclierDePlatine extends Equipment {
    name = "Bouclier de platine";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.equipStat("Défense").base = 100;

        this.text = Text;
    };
}