import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Wyverne extends Creature {
    name = "Wyverne";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 100]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand une carte alliée est posée : Si sur la pile : Réduit de 10 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card)) {
            this.costReduce(10);
        }
    };
};