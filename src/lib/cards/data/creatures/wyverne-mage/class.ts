import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneMage extends Creature {
    name = "Wyverne mage";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 90]]);

        this.initFamily(["Reptile", "Wyverne", "Mage"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);
        this.stat("Magie").init(10);

        this.addText(`Quand une carte alliée de famille Sort est posée : Si sur la pile : Réduit de 5 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isFamily("Sort")) {
            this.costReduce(5);
        }
    };
};