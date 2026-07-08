import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Heros extends Creature {
    name = "Héros";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand une autre créature alliée est posée : Si sur le terrain : Augmente de 10 sa constitution et sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && this.isAlly(card)) {
            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};