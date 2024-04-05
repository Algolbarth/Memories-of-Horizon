import { Creature } from '../Creature.js';

export class Soldat extends Creature {
    name = "Soldat";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
    };
}