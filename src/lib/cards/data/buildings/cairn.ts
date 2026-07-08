import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Cairn extends Building {
    name = "Cairn";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Terre", 8]]);

        this.initFamily(["Mage"]);

        this.stat("Constitution").init(10);
        this.stat("Magie").init(5);
    };
};