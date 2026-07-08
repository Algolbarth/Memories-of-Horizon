import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Muraille extends Building {
    name = "Muraille";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.stat("Constitution").init(200);

        this.initFamily(["Mur"]);
    };
};