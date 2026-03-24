import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Foret extends Location {
    name = "Forêt";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Végétal", 15]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Végétal.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Végétal")) {
            return true;
        }
        return false;
    };
};