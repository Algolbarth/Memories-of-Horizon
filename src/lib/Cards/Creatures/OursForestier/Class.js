import { Creature } from '../Creature.js';

export class OursForestier extends Creature {
    name = "Ours forestier";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Végétal", 20]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 30;
    };
}