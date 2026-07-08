import type { System } from '$lib/system/class';
import { Boss } from '$lib/cards/class/boss';

export class GoHoumei extends Boss {
    name = "Go Houmei, reine des tours";

    constructor(system: System) {
        super(system);

        this.level = 6;
        this.elements.base = ["Terre"];
        this.initFamily(["Nain"]);

        this.stat("Force").init(50);
        this.stat("Constitution").init(250);
    };
}