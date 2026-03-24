import type { System } from '$lib/system/class';
import { Location } from '$lib/cards/class/location';

export class MerDEther extends Location {
    name = "Mer d'ether";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.trait("Légendaire").init(true);

        this.addText(`Si actif : Tout est possible.`);
    };
};