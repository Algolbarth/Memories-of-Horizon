import { Creature } from '../Creature.js';

export class Grenouille extends Creature {
    name = "Grenouille";

    constructor(System) {
        super(System);

        this.init([["Or", 5], ["Eau", 5]]);

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.move("Main");
        }
    };
}