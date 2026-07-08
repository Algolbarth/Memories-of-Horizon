import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverneVerte extends Creature {
    name = "Grande wyverne verte";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Nature", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(50);

        this.addText(`Quand une carte alliée d'élément Nature est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Augmente de 15 sa constitution.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Nature")) {
            this.costReduce(10);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Constitution").increase(15);
        }
    };
};