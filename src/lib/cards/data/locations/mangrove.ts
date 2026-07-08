import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class Mangrove extends Location {
    name = "Mangrove";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10], ["Nature", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Eau et d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Eau") && card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};