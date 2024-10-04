import { Creature } from '../Creature.js';

export class Chevalier extends Creature {
    name = "Chevalier";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Défense").base = 5;
    };
}