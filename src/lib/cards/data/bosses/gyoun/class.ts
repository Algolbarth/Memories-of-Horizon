import type { System } from '$lib/system/class';
import { Boss } from '$lib/cards/class/boss';

export class Gyoun extends Boss {
    name = "Gyoun, colosse de jade";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.elements.base = ["Nature"];
        this.initFamily(["Elfe"]);

        this.stat("Force").init(100);
        this.stat("Constitution").init(1000);
    };
}