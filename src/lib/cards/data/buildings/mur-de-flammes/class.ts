import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class MurDeFlammes extends Building {
    name = "Mur de flammes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.stat("Constitution").init(25);
        this.stat("Radiation").init(15);

        this.initFamily(["Mur"]);
    };
};