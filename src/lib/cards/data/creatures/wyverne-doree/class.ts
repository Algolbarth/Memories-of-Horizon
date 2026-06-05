import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class WyverneDoree extends Creature {
    name = "Wyverne dorée";

    constructor(system: System) {
        super(system);

        this.level = 5;
        this.init([["Or", 90]]);

        this.initFamily(["Reptile", "Wyverne"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);

        this.addText(`Quand une carte alliée d'élément Neutre est posée : Si sur la pile : Réduit de 5 son coût.`);
        this.addText(`Quand posé : Augmente de 2 votre production d'or.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isElement("Neutre")) {
            this.costReduce(5);
        }
    };

    useEffect = () => {
        this.owner().ressource("Or").increase(2);

        this.move("Terrain");
        this.pose();
    };
};