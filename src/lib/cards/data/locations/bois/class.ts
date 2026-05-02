import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class Bois extends Location {
    name = "Bois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Neutre ou d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Neutre") || card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};