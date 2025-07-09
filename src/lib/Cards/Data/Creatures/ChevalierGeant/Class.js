import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ChevalierGeant extends Creature {
    name = "Chevalier géant";
    otherForm = "Chevalier géant (monté)";
    mounted = false;

    constructor(System) {
        super(System);

        this.init([["Or", 150]]);
        this.familles.base.push("Géant", "Chevalier");

        this.stat("Vie").base = 120;
        this.stat("Vie").current = 120;
        this.stat("Attaque").base = 120;
        this.stat("Défense").base = 30;
    };
}

export class ChevalierGeantMonte extends Creature {
    name = "Chevalier géant (monté)";
    otherForm = "Chevalier géant";
    mounted = true;

    constructor(System) {
        super(System);

        this.init([["Or", 300]]);
        this.familles.base.push("Géant", "Chevalier");

        this.trait("Rare").base = true;

        this.stat("Vie").base = 200;
        this.stat("Vie").current = 200;
        this.stat("Attaque").base = 200;
        this.stat("Défense").base = 50;
        this.stat("Vitesse").base = 5;

        this.text = Text;
    };

    dieEffect = function () {
        this.transform("Chevalier géant");
        this.zone.cards[this.slot].stat("Vie").current = this.zone.cards[this.slot].stat("Vie").value();
    };

    dieGo = function () {

    };
}