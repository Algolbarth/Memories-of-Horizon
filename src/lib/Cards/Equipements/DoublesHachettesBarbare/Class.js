import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class DoublesHachettesBarbare extends Equipment {
    name = "Doubles hachettes barbare";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Arme");
        
        this.equipStat("Adresse").base = 30;
        this.equipStat("Multicoup").base = 1;

        this.text = Text;
    };
}