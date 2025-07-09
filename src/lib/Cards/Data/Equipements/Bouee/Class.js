import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class Bouee extends Equipment {
    name = "Bouée";

    constructor(System) {
        super(System);

        this.init([["Or", 5], ["Eau", 5]]);
        this.equipElements = ["Eau"];

        this.text = Text;
    };
}