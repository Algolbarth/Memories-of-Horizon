import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class ForetDeCharbon extends Location {
    name = "Forêt de charbon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10], ["Nature", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Feu et d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Feu") && card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};