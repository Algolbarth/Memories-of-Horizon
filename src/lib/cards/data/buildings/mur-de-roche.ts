import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class MurDeRoche extends Building {
    name = "Mur de roche";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.stat("Constitution").init(50);
        this.stat("Endurance").init(25);

        this.initFamily(["Mur"]);
    };
};