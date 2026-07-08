import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class FalaiseRuisselante extends Location {
    name = "Falaise ruisselante";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10], ["Terre", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Eau ou d'élément Terre.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Eau") || card.isElement("Terre")) {
            return true;
        }
        return false;
    };
};