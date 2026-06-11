import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';

export class Minotaure extends Creature {
    name = "Minotaure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10]]);

        this.initFamily(["Minotaure"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(15);

        this.addText([`Quand un bâtiment adverse meurt : Si sur le terrain : Augmente de 1 sa constitution et  sa force.`]);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Building && this.isNotAlly(card)) {
            this.stat("Constitution").increase(1);
            this.stat("Force").increase(1);
        }
    };
};