import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import { copy } from '$lib/utils';

export class MereWyverne extends Creature {
    name = "Mère wyverne";

    constructor(system: System) {
        super(system);

        this.level = 15;
        this.init([["Or", 270]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(70);
        this.stat("Force").init(70);

        this.addText(`Quand une carte alliée de famille Wyverne est posée : Si sur la pile : Réduit de 15 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Réduit de 5 le coût de toutes les cartes de famille Wyverne sur votre pile.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isFamily("Wyverne")) {
            this.costReduce(15);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let stack = copy(this.owner().zone("Pile").cards);
            for (const card of stack) {
                if (card.isFamily("Wyverne")) {
                    card.costReduce(5);
                }
            }
        }
    };
};