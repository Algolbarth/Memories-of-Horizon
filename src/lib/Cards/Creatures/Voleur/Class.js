import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Voleur extends Creature {
    name = "Voleur";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    fightEffect = function () {
        this.getVente("Or").base += 2;
    };
}