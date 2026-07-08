import type { System } from '$lib/system/class';
import { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Iconoclaste extends Creature {
    name = "Iconoclaste";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand une autre carte alliée est meulée : Augmente de 1 sa constitution et sa force.`);
    };

    otherMillEffect = (card: Card) => {
        if (this.isAlly(card)) {
            this.stat("Constitution").increase(1);
            this.stat("Force").increase(1);
        }
    };
};