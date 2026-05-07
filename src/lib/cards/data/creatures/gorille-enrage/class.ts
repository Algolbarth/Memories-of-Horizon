import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class GorilleEnrage extends Creature {
    name = "Gorille enragé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Nature", 40]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(35);
        this.stat("Force").init(20);

        this.addText(`Quand un {card:Écrasement} allié est posé : Si sur le terrain : Augmente de 15 sa constitution.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.name == "Écrasement") {
            this.stat("Constitution").increase(15);
        }
    };
};