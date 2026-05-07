import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneVerte extends Creature {
    name = "Wyverne verte";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 45], ["Nature", 45]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(60);
        this.stat("Force").init(30);

        this.addText(`Quand une carte alliée d'élément Nature est posée : Si sur la pile : Réduit de 5 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Nature")) {
            this.costReduce(5);
        }
    };
};