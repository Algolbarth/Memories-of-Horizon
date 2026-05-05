import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class GrandeWyverneMarine extends Creature {
    name = "Grande wyverne marine";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Eau", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand une carte alliée d'élément Eau est posée : Si sur la pile : Réduit de 20 son coût.`);
        this.addText(`Quand se prépare sur le terrain : Produit 25 eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Eau")) {
            this.costReduce(20);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Eau").produce(25);
        }
    };
};