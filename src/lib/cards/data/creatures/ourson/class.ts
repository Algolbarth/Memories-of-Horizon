import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Ourson extends Creature {
    name = "Ourson";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);
        this.stat("Endurance").init(5);
    };
};