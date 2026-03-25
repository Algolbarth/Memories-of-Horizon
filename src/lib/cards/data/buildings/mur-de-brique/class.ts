import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class MurDeBrique extends Building {
    name = "Mur de brique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(50);

        this.initFamily(["Mur"]);
    };
};