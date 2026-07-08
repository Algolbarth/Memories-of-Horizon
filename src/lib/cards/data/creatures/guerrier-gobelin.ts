import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GuerrierGobelin extends Creature {
    name = "Guerrier gobelin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(20);
        this.stat("Endurance").init(5);
    };
};