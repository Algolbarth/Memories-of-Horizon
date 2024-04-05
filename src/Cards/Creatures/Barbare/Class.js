import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Barbare extends Creature {
    name = "Barbare";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.familles.base.push("Humain");
        
        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;

        this.text = Text;
    };

    fightEffect = function () {
        this.stat("Attaque").add += 2;
    };
}