import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Phytomancien extends Creature {
    name = "Phytomancien";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Nature", 12]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);

        this.addText(`Quand une autre carte alliée d'élément Nature est posée : Si sur le terrain : Augmente de 3 sa constitution.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card.isElement("Nature") && this.isAlly(card)) {
            this.stat("Constitution").increase(3);
        }
    };
};