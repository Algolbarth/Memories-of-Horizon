import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Village extends Location {
    name = "Village";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Si actif : Les cartes piochables sont de niveau 5 ou moins.`);
    };

    canRead = (card: Card) => {
        if (card.level <= 5) {
            return true;
        }
        return false;
    };
};