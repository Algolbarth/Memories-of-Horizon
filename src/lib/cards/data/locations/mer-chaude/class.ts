import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class MerChaude extends Location {
    name = "Mer chaude";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10], ["Eau", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Feu et d'élément Eau.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Feu") && card.isElement("Eau")) {
            return true;
        }
        return false;
    };
};