import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class HacheDePlatine extends Equipment {
    name = "Hache de platine";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.equipStat("Adresse").base = 50;
        this.equipStat("Intensité").base = 2;

        this.text = Text;
    };
}