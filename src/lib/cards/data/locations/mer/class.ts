import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class Mer extends Location {
    name = "Mer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Eau.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Eau")) {
            return true;
        }
        return false;
    };
};