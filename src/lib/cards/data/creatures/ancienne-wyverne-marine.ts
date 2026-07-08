import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class AncienneWyverneMarine extends Creature {
    name = "Ancienne wyverne marine";

    constructor(system: System) {
        super(system);

        this.level = 20;
        this.init([["Or", 225], ["Eau", 225]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(100);

        this.addText(`Quand une carte alliée d'élément Eau est posée : Si sur la pile : Réduit de 25 son coût.`);
        this.addText(`Quand une carte alliée d'élément Eau est posée : Si sur le terrain : Produit 20 eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.isElement("Eau")) {
            if (this.isArea("Pile")) {
                this.costReduce(25);
            }
            else if (this.isArea("Terrain")) {
                this.owner().ressource("Eau").produce(20);
            }
        }
    };
};