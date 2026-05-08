import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverneTerrestre extends Creature {
    name = "Grande wyverne terrestre";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Terre", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
        this.stat("Endurance").init(30);

        this.addText(`Quand une carte alliée d'élément Terre est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Augmente de 10 son endurance.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Terre")) {
            this.costReduce(10);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Endurance").increase(10);
        }
    };
};