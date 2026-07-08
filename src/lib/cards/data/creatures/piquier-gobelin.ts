import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class PiquierGobelin extends Creature {
    name = "Piquier gobelin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Feu", 8]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(15);
        this.stat("Percée").init(10);
    };
};