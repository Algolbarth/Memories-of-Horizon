import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class VillageNatal extends Location {
    name = "Village natal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Si actif : Les cartes piochables sont de niveau 1.`);
    };

    canRead = (card: Card) => {
        if (card.level == 1) {
            return true;
        }
        return false;
    };
};