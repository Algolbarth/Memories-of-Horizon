import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class MurDePierre extends Building {
    name = "Mur de pierre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.stat("Constitution").init(30);
        this.stat("Endurance").init(10);

        this.initFamily(["Mur"]);
    };
};