import type { System } from '$lib/system/class';
import { Location } from '$lib/cards/class/location';

export class Plaine extends Location {
    name = "Plaine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Si actif : Toutes les cartes sont piochables.`);
    };
};