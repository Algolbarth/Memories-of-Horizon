import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Statue extends Building {
    name = "Statue";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35]]);

        this.trait("Rare").init(true);

        this.stat("Constitution").init(50);
        this.stat("Endurance").init(10);
    };
};