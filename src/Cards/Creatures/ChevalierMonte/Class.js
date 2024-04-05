import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ChevalierMonte extends Creature {
    name = "Chevalier monté";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 20;
        this.stat("Vitesse").base = 1;

        this.text = Text;
    };

    dieEffect = function () {
        this.transform("Chevalier");
        this.zone.cards[this.slot].stat("Vie").current = this.zone.cards[this.slot].stat("Vie").value();
    };

    dieGo = function () {
        
    };
}