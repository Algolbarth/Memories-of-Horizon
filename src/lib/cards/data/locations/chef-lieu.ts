import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class ChefLieu extends Location {
    name = "Chef-lieu";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Si actif : Les cartes piochables sont de niveau 5 ou plus.`);
    };

    canRead = (card: Card) => {
        if (card.level >= 5) {
            return true;
        }
        return false;
    };
};