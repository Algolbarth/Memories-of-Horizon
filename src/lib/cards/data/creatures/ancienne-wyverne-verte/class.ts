import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverneVerte extends Creature {
    name = "Ancienne wyverne verte";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 225], ["Nature", 225]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(200);
        this.stat("Force").init(100);

        this.addText(`Quand une carte alliée d'élément Nature est posée : Si sur la pile : Réduit de 25 son coût.`);
        this.addText(`Quand une carte alliée d'élément Nature est posée : Si sur le terrain : Augmente de 15 sa constitution.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.isElement("Nature")) {
            if (this.isArea("Pile")) {
                this.costReduce(25);
            }
            else if (this.isArea("Terrain")) {
                this.stat("Constitution").increase(15);
            }
        }
    };
};