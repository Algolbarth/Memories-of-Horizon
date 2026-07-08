import type { System } from '$lib/system/class';
import { Boss } from '$lib/cards/class/boss';

export class Ballas extends Boss {
    name = "Ballas, suprémaciste";

    constructor(system: System) {
        super(system);

        this.level = 18;
        this.elements.base = ["Eau"];
        this.initFamily(["Ondin"]);

        this.stat("Force").init(800);
        this.stat("Constitution").init(15000);
    };
}