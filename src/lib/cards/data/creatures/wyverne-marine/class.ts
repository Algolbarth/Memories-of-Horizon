import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneMarine extends Creature {
    name = "Wyverne marine";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 45], ["Eau", 45]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand une carte alliée d'élément Eau est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand posé : Produit 25 eau.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Eau")) {
            this.costReduce(10);
        }
    };

    useEffect = () => {
        this.owner().ressource("Eau").produce(25);

        this.move("Terrain");
        this.pose();
    };
};