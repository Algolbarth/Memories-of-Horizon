import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Ville extends Location {
    name = "Ville";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Si actif : Les cartes piochables sont Neutre.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Neutre")) {
            return true;
        }
        return false;
    };
};