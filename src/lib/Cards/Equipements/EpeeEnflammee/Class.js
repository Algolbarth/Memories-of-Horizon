import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class EpeeEnflammee extends Equipment {
    name = "Épée enflammée";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Feu", 25]]);
        this.familles.base.push("Arme");
        
        this.equipStat("Attaque").base = 20;

        this.text = Text;
    };

    fightEffect = function (defender) {
        defender.damage(20);
    };
}