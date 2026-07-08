import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Archimage extends Creature {
    name = "Archimage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Humain", "Mage"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
        this.stat("Magie").init(25);
    };
};