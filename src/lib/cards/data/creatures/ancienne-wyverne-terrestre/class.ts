import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverneTerrestre extends Creature {
    name = "Ancienne wyverne terrestre";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 225], ["Terre", 225]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(100);
        this.stat("Endurance").init(30);

        this.addText(`Quand une carte alliée d'élément Terre est posée : Si sur la pile : Réduit de 50 son coût.`);
        this.addText(`Quand une carte alliée d'élément Terre est posée : Si sur la pile : Augmente de 15 son endurance.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.isElement("Terre")) {
            if (this.isArea("Pile")) {
                this.costReduce(50);
            }
            else if (this.isArea("Terrain")) {
                this.stat("Endurance").increase(15);
            }
        }
    };
};