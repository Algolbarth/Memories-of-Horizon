import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverne extends Creature {
    name = "Grande wyverne";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 200]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(80);
        this.stat("Force").init(80);

        this.addText(`Quand une carte alliée est posée : Si sur la pile : Réduit de 20 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Augmente de 10 sa constitution et sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card)) {
            this.costReduce(20);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};