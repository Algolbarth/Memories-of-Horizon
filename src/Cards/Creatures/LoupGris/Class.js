import { Creature } from '../Creature.js';

export class LoupGris extends Creature {
    name = "Loup gris";

    constructor(System) {
        super(System);

        this.init([["Or", 8]]);
        this.familles.base.push("Bête");
        
        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 10;
    };
}