import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Volcan extends Location {
    name = "Volcan";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10], ["Terre", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Feu et d'élément Terre.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Feu") && card.isElement("Terre")) {
            return true;
        }
        return false;
    };
};