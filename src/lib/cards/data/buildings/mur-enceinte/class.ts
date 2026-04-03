import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class MurDEnceinte extends Building {
    name = "Mur d'enceinte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.stat("Constitution").init(100);

        this.initFamily(["Mur"]);
    };
};