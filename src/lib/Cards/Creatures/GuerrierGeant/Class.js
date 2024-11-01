import { Creature } from '../Creature.js';

export class GuerrierGeant extends Creature {
    name = "Guerrier géant";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.familles.base.push("Géant");

        this.stat("Vie").base = 75;
        this.stat("Vie").current = 75;
        this.stat("Attaque").base = 75;
        this.stat("Défense").base = 25;
    };
}