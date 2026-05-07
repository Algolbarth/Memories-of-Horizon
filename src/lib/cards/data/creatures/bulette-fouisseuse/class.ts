import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class BuletteFouisseuse extends Creature {
    name = "Bulette fouisseuse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Terre", 40]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);
        this.stat("Endurance").init(15);

        this.addText(`Quand un {card:Contre} allié est posé : Si sur le terrain : Augmente de 10 son endurance.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.name == "Contre") {
            this.stat("Endurance").increase(10);
        }
    };
};