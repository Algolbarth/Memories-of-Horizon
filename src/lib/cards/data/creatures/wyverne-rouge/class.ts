import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneRouge extends Creature {
    name = "Wyverne rouge";

    constructor(system: System) {
        super(system);

        this.level = 3;
        this.init([["Or", 30], ["Feu", 30]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(40);

        this.addText(`Quand une carte alliée d'élément Feu est posée : Si sur la pile : Réduit de 6 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Feu")) {
            this.costReduce(6);
        }
    };
};