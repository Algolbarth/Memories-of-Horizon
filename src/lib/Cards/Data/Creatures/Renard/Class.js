import { Creature } from '../Creature.js';

export class Renard extends Creature {
    name = "Renard";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Végétal", 8]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Intelligence").base = 2;
    };
}