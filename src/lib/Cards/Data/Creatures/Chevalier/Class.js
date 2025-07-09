import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class Chevalier extends Creature {
    name = "Chevalier";
    otherForm = "Chevalier (monté)";
    mounted = false;

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Humain", "Chevalier");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Défense").base = 5;
    };
}

export class ChevalierMonte extends Creature {
    name = "Chevalier (monté)";
    otherForm = "Chevalier";
    mounted = true;

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Humain", "Chevalier");

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