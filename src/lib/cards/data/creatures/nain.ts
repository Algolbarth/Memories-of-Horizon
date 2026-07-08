import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Nain extends Creature {
    name = "Nain";

    constructor(system: System) {
        super(system);

        this.init([["Or", 4], ["Terre", 4]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);
    };
};