import { Creature } from '../Creature.js';

export class Geant extends Creature {
    name = "Géant";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Géant");

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 50;
    };
}