import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverneDoree extends Creature {
    name = "Ancienne wyverne dorée";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 450]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(200);
        this.stat("Force").init(200);

        this.addText(`Quand une carte alliée d'élément Neutre est posée : Si sur la pile : Réduit de 25 son coût.`);
        this.addText(`Quand une carte alliée d'élément Neutre est posée : Si sur le terrain : Augmente de 1 votre production d'or.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.isElement("Neutre")) {
            if (this.isArea("Pile")) {
                this.costReduce(25);
            }
            else if (this.isArea("Terrain")) {
                this.owner().ressource("Or").increase(1);
            }
        }
    };
};