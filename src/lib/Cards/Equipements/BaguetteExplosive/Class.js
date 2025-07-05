import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class BaguetteExplosive extends Equipment {
    name = "Baguette explosive";

    constructor(System) {
        super(System);

        this.init([["Or", 40], ["Feu", 40]]);
        this.familles.base.push("Arme");
        
        this.equipStat("Magie").base = 10;

        this.text = Text;
    };

    fightEffect = function (defender) {
        defender.damage(this.bearer.stat("Magie").value());
    };
}