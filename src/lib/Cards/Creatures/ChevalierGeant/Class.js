import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class ChevalierGeant extends Creature {
    name = "Chevalier géant";

    constructor(System) {
        super(System);

        this.init([["Or", 150]]);
        this.familles.base.push("Géant");

        this.stat("Vie").base = 120;
        this.stat("Vie").current = 120;
        this.stat("Attaque").base = 120;
        this.stat("Défense").base = 30;
    };
}

export class ChevalierGeantMonte extends Creature {
    name = "Chevalier géant monté";

    constructor(System) {
        super(System);

        this.init([["Or", 300]]);
        this.familles.base.push("Géant");

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