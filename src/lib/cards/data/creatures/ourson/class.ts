import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Ourson extends Creature {
    name = "Ourson";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Terre", 5]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(5);
    };
};