import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';

export class GuerrierMinotaure extends Creature {
    name = "Guerrier minotaure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Terre", 30]]);

        this.initFamily(["Minotaure"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);
        this.stat("Endurance").init(5);

        this.addText(`Quand un bâtiment adverse meurt : Si sur le terrain : Augmente de 5 sa constitution et sa force.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Building && this.isNotAlly(card)) {
            this.stat("Constitution").increase(5);
            this.stat("Force").increase(5);
        }
    };
};