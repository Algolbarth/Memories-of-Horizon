import { Creature } from '../Creature.js';

export class SageDeLaForet extends Creature {
    name = "Sage de la forêt";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Végétal", 25]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 35;
        this.stat("Vie").current = 35;
        this.stat("Attaque").base = 5;
        this.stat("Intelligence").base = 5;
    };
}