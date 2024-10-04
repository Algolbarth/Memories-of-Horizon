import { Creature } from '../Creature.js';

export class ChevalierGeant extends Creature {
    name = "Chevalier géant";

    constructor(System) {
        super(System);

        this.init([["Or", 150]]);
        this.familles.base.push("Géant");
        
        this.stat("Vie").base = 120;
        this.stat("Vie").current = 120;
        this.stat("Attaque").base = 120;
        this.stat("Défense").base = 30;
    };
}