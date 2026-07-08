import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class CiteDOr extends Location {
    name = "Cité d'or";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Si actif : Les cartes piochables sont du même niveau que la pile.`);
    };

    canRead = (card: Card) => {
        if (card.level == this.owner().zone("Pile").level()) {
            return true;
        }
        return false;
    };
};