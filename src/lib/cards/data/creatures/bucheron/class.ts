import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Bucheron extends Creature {
    name = "Bûcheron";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);

        this.addText(`Quand une unité adverse d'élément Nature meurt : Stocke 2 nature.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Nature") && this.isNotAlly(card)) {
            this.owner().ressource("Nature").stock(2);
        }
    };
};