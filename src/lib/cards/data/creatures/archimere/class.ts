import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Archimere extends Creature {
    name = "Archimère";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Bête", "Reptile"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand une autre créature alliée est posée : Si sur le terrain : Augmente de 5 sa constitution et sa force pour chaque famille de cette créature.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && this.isAlly(card)) {
            for (let i = 0; i < card.families.total().length; i++) {
                this.stat("Constitution").increase(5);
                this.stat("Force").increase(5);
            }
        }
    };
};