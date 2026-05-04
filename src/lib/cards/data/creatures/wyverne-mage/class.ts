import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneMage extends Creature {
    name = "Wyverne mage";

    constructor(system: System) {
        super(system);

        this.level = 3;
        this.init([["Or", 60]]);

        this.initFamily(["Reptile", "Wyverne", "Mage"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Magie").init(5);

        this.addText(`Quand une carte alliée de famille Sort est posée : Si sur la pile : Réduit de 6 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isFamily("Sort")) {
            this.costReduce(6);
        }
    };
};