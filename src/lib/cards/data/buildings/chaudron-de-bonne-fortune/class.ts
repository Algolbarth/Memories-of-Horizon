import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class ChaudronDeBonneFortune extends Creature {
    name = "Chaudron de bonne fortune";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Nature", 30]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(20);

        this.addText(`Quand une carte alliée est découverte : Produit 5 or.`);
    };

    discoverCardEffect = (card: Card) => {
        this.owner().ressource("Or").produce(5);
    };
};