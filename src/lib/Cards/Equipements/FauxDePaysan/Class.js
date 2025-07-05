import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class FauxDePaysan extends Equipment {
    name = "Faux de paysan";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Arme");

        this.text = Text;
    };

    killEffect = function () {
        this.owner.ressource("Or").stock += 5;
    };
}