import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Tortue extends Creature {
    name = "Tortue";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Eau", 8]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(5);
        this.stat("Endurance").init(5);
    };
};