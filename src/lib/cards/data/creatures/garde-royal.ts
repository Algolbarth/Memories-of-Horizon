import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GardeRoyal extends Creature {
    name = "Garde royal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
        this.stat("Charisme").init(5);
    };
};