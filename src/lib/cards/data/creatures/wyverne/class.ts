import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Wyverne extends Creature {
    name = "Wyverne";

    constructor(system: System) {
        super(system);

        this.level = 3;
        this.init([["Or", 50]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand une carte alliée est posée : Si dans la pile : Réduit son coût de 5.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card)) {
            this.costReduce(5);
        }
    };
};