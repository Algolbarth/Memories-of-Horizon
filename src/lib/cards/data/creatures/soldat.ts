import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Soldat extends Creature {
    name = "Soldat";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
    };
};