import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Canon extends Building {
    name = "Canon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.stat("Constitution").init(50);
        this.stat("Portée").init(50);
    };
};