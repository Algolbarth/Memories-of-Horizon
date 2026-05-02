import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Marais extends Location {
    name = "Marais";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10], ["Nature", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Eau ou d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Eau") || card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};