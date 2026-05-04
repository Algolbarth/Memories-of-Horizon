import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class JeuneWyverne extends Creature {
    name = "Jeune wyverne";

    constructor(system: System) {
        super(system);

        this.level = 1;
        this.init([["Or", 30]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addText(`Quand une carte alliée de niveau 1 est posée : Si sur la pile : Réduit de 3 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.level == 1) {
            this.costReduce(3);
        }
    };
};