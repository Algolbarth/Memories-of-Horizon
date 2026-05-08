import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverneDoree extends Creature {
    name = "Grande wyverne dorée";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 180]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(80);
        this.stat("Force").init(80);

        this.addText(`Quand une carte alliée d'élément Neutre est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Augmente de 2 votre production d'or.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Neutre")) {
            this.costReduce(10);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Or").increase(2);
        }
    };
};