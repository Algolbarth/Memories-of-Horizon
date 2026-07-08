import type { System } from '$lib/system/class';
import { Boss } from '$lib/cards/class/boss';

export class Atlas extends Boss {
    name = "Atlas, marche-cratère";

    constructor(system: System) {
        super(system);

        this.level = 16;
        this.elements.base = ["Neutre"];
        this.initFamily(["Géant"]);

        this.stat("Force").init(600);
        this.stat("Constitution").init(8000);
    };
}