import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class OursNoir extends Creature {
    name = "Ours noir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(45);
        this.stat("Force").init(30);
    };
};