import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Montagne extends Location {
    name = "Montagne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Terre.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Terre")) {
            return true;
        }
        return false;
    };
};