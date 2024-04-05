import { Creature } from '../Creature.js';

export class Nain extends Creature {
    name = "Nain";

    constructor(System) {
        super(System);

        this.init([["Or", 4], ["Terre", 4]]);
        this.familles.base.push("Nain");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Défense").base = 3;
    };
}