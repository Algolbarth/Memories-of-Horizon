import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverneRouge extends Creature {
    name = "Grande wyverne rouge";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Feu", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(60);
        this.stat("Force").init(100);

        this.addText(`Quand une carte alliée d'élément Feu est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Augmente de 20 sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Feu")) {
            this.costReduce(10);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Force").increase(20);
        }
    };
};