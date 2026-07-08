import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Pyromancien extends Creature {
    name = "Pyromancien";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addText(`Quand une carte alliée d'élément Feu est posée : Si sur le terrain : Augmente de 5 sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Feu") && this.isAlly(card)) {
            this.stat("Force").increase(5);
        }
    };
};