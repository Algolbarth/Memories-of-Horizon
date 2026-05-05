import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverne extends Creature {
    name = "Ancienne wyverne";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 500]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(150);
        this.stat("Force").init(150);

        this.addText(`Quand une carte alliée est posée : Si sur la pile : Réduit de 50 son coût.`);
        this.addText(`Quand une carte alliée est posée : Si sur le terrain : Augmente de 10 sa constitution et sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card)) {
            if (this.isArea("Pile")) {
                this.costReduce(50);
            }
            else if (this.isArea("Terrain")) {
                this.stat("Constitution").increase(10);
                this.stat("Force").increase(10);
            }
        }
    };
};