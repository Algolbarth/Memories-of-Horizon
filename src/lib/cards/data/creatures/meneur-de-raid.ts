import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';

export class MeneurDeRaid extends Creature {
    name = "Meneur de raid";

    constructor(system: System) {
        super(system);

        this.init([["Or", 125], ["Terre", 125]]);

        this.initFamily(["Minotaure", "Commandant"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand un bâtiment adverse meurt : Si sur le terrain : Augmente de 5 la force de toutes les créatures sur votre terrain.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Building && this.isNotAlly(card)) {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Force").increase(5);
                }
            }
        }
    };
};