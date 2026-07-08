import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Mouton extends Creature {
    name = "Mouton";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);
        this.stat("Endurance").init(3);
        this.stat("Résistance").init(3);
    };
};