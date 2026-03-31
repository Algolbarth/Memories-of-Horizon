import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Epouvantail extends Building {
    name = "Épouvantail";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(10);
        this.stat("Charisme").init(2);
    };
};