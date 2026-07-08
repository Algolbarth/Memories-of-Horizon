import type { System } from '$lib/system/class';
import { Boss } from '$lib/cards/class/boss';

export class DucYousei extends Boss {
    name = "Duc Yousei";

    constructor(system: System) {
        super(system);

        this.level = 8;
        this.elements.base = ["Feu"];
        this.initFamily(["Gobelin"]);

        this.stat("Force").init(75);
        this.stat("Constitution").init(500);
    };
}