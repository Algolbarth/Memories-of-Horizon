import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Location } from '$lib/cards/class/location';

export class RuinesAntiques extends Location {
    name = "Ruines antiques";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10], ["Nature", 10]]);

        this.addText(`Si actif : Les cartes piochables sont d'élément Terre et d'élément Nature.`);
    };

    canRead = (card: Card) => {
        if (card.isElement("Terre") && card.isElement("Nature")) {
            return true;
        }
        return false;
    };
};