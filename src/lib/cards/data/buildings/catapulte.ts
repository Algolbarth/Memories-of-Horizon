import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Catapulte extends Building {
    name = "Catapulte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.stat("Constitution").init(20);
        this.stat("Endurance").init(10);
        this.stat("Portée").init(20);
    };
};