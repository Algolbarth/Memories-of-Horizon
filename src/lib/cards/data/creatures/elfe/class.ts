import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Elfe extends Creature {
    name = "Elfe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 4], ["Nature", 4]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);
    };
};