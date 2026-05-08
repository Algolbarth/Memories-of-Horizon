import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class Colline extends Location {
    name = "Colline";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Neutre ou d'élément Terre.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Neutre") || card.isElement("Terre")) {
            return true;
        }
        return false;
    };
};