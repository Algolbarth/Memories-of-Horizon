import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class SageDeLaForet extends Creature {
    name = "Sage de la forêt";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(35);
        this.stat("Force").init(5);
        this.stat("Intelligence").init(5);
    };
};