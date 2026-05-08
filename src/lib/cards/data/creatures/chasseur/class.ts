import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Chasseur extends Creature {
    name = "Chasseur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand une autre créature alliée de famille Bête périt : Si sur le terrain : Augmente de 1 sa constitution et sa force.`);
    };

    otherPerishEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && this.isAlly(card) && card.isFamily("Bête")) {
            this.stat("Constitution").increase(1);
            this.stat("Force").increase(1);
        }
    };
};