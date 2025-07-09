import { Creature } from '../Creature.js';

export class Tortue extends Creature {
    name = "Tortue";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Eau", 8]]);
        this.familles.base.push("Reptile");

        this.stat("Vie").base = 15;
        this.stat("Vie").current = 15;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 5;
    };
}