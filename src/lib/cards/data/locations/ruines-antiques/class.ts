import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class VersantVerdoyantes extends Location {
    name = "Versant verdoyant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10], ["Nature", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Terre ou d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Terre") || card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};