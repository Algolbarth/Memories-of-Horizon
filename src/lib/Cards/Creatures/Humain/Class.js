import { Creature } from '../Creature.js';

export class Humain extends Creature {
    name = "Humain";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
    };
}