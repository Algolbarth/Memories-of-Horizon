import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Baliste extends Building {
    name = "Baliste";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.stat("Constitution").init(40);
        this.stat("Portée").init(20);
    };
};