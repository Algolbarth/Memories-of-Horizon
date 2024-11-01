import { Creature } from '../Creature.js';

export class Archimage extends Creature {
    name = "Archimage";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 50;
        this.stat("Magie").base = 50;
    };
}