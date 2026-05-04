import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class WyverneMarine extends Creature {
    name = "Wyverne marine";

    constructor(system: System) {
        super(system);

        this.level = 3;
        this.init([["Or", 30], ["Eau", 30]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);

        this.addText([
            `Quand une carte alliée d'élément Eau est posée : Si sur la pile : Réduit de 6 son coût.`,
            `Quand posé : Produit 10 eau.`]);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Eau")) {
            this.costReduce(6);
        }
    };

    useEffect = () => {
        this.owner().ressource("Eau").produce(10);

        this.move("Terrain");
        this.pose();
    };
};