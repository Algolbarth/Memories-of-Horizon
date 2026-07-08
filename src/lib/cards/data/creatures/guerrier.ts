import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Guerrier extends Creature {
    name = "Guerrier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);
    };
};