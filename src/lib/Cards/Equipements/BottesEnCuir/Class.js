import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BottesEnCuir extends Equipment {
    name = "Bottes en cuir";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.equipStat("Vitesse").base = 1;

        this.text = Text;
    };
}