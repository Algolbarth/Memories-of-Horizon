import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class WargEnChasse extends Creature {
    name = "Warg en chasse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Feu", 40]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(40);

        this.addText(`Quand une {card:Frappe} alliée est posée : Si sur le terrain : Augmente de 20 sa force.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card.name == "Frappe") {
            this.stat("Force").increase(20);
        }
    };
};