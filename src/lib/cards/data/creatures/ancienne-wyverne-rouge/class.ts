import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverneRouge extends Creature {
    name = "Ancienne wyverne rouge";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 225], ["Feu", 225]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(200);

        this.addText(`Quand une carte alliée d'élément Feu est posée : Si sur la pile : Réduit de 20 son coût.`);
        this.addText(`Quand une carte alliée d'élément Feu est posée : Si sur le terrain : Augmente de 25 sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.isElement("Feu")) {
            if (this.isArea("Pile")) {
                this.costReduce(50);
            }
            else if (this.isArea("Terrain")) {
                this.stat("Force").increase(25);
            }
        }
    };
};