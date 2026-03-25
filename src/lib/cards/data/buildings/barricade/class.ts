import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Barricade extends Building {
    name = "Barricade";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.stat("Constitution").init(20);

        this.initFamily(["Mur"]);
    };
};