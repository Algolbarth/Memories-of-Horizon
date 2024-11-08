import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class Trident extends Equipment {
    name = "Trident";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);
        this.equipStat("Attaque").base = 35;
        this.equipStat("Percée").base = 50;

        this.text = Text;
    };

    killEffect = function () {
        this.owner.ressource("Eau").stock += 5;
    };
}