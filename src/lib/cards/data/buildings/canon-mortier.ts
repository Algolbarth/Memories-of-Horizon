import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class CanonMortier extends Building {
    name = "Canon mortier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Terre", 50]]);

        this.stat("Constitution").init(20);
        this.stat("Endurance").init(10);
        this.stat("Portée").init(50);
        this.stat("Percée").init(25);
    };
};