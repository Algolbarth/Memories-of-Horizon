import { Creature } from '../Creature.js';

export class Guerrier extends Creature {
    name = "Guerrier";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Défense").base = 5;
    };
}