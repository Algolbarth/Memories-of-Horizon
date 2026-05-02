import type { System } from '$lib/system/class';
import { Location } from '$lib/cards/class/location';

export class ZoneIntersiderale extends Location {
    name = "Zone intersidérale";

    constructor(system: System) {
        super(system);

        this.level = 20;

        this.trait("Légendaire").init(true);

        this.addText(`Si actif : Toutes les cartes sont piochables.`);
    };
};