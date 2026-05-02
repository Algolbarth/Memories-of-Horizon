import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneVerte extends Creature {
    name = "Wyverne verte";

    constructor(system: System) {
        super(system);

        this.level = 3;
        this.init([["Or", 30], ["Nature", 30]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(35);
        this.stat("Force").init(20);

        this.addText(`Quand une carte alliée d'élément Nature est posée : Si dans la pile : Réduit son coût de 6.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Nature")) {
            this.costReduce(6);
        }
    };
};