import { Creature } from '../Creature.js';

export class Chien extends Creature {
    name = "Chien";

    constructor(System) {
        super(System);

        this.init([["Or", 3]]);
        this.familles.base.push("Bête");
        
        this.stat("Vie").base = 3;
        this.stat("Vie").current = 3;
        this.stat("Attaque").base = 3;
    };
}