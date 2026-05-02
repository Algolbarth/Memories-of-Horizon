import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Renard extends Creature {
    name = "Renard";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Nature", 8]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Intelligence").init(2);
    };
};