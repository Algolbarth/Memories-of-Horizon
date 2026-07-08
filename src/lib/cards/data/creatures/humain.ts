import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Humain extends Creature {
    name = "Humain";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
    };
};