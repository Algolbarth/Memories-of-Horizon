import { Creature } from '../Creature.js';

export class Garde extends Creature {
    name = "Garde";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Protection").base = 1;
    };
}