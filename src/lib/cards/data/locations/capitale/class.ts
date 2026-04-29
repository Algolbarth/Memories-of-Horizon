import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Capitale extends Location {
    name = "Capitale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Si actif : Les cartes piochables sont de niveau 10 ou plus.`);
    };

    canRead = (card: Card) => {
        if (card.level >= 10) {
            return true;
        }
        return false;
    };
};