import { Creature } from '../Creature.js';

export class Vache extends Creature {
    name = "Vache";

    constructor(System) {
        super(System);

        this.init([["Or", 8]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 5;
    };
}