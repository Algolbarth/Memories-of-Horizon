import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Canon extends Building {
    name = "Canon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35]]);

        this.stat("Constitution").init(20);
        this.stat("Portée").init(50);
    };
};