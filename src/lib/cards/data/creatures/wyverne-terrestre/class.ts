import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneTerrestre extends Creature {
    name = "Wyverne terrestre";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 45], ["Terre", 45]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);
        this.stat("Endurance").init(25);

        this.addText(`Quand une carte alliée d'élément Terre est posée : Si sur la pile : Réduit de 10 son coût.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Terre")) {
            this.costReduce(10);
        }
    };
};