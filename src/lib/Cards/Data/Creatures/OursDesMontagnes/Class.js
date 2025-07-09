import { Creature } from '../Creature.js';

export class OursDesMontagnes extends Creature {
    name = "Ours des montagnes";

    constructor(System) {
        super(System);

        this.init([["Or", 20], ["Terre", 20]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 35;
        this.stat("Vie").current = 35;
        this.stat("Attaque").base = 35;
        this.stat("Défense").base = 5;
    };
}