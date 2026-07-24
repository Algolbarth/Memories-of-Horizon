import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Archer extends Creature {
    name = "Archer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Portée").init(5);
    };
};