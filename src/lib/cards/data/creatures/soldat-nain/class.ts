import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import type { Unit } from '$lib/cards/class/unit';

export class SoldatNain extends Creature {
    name = "Soldat nain";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);

        this.addText(`Quand arrive sur le terrain : Augmente de 2 sa constitution et sa force pour chaque bâtiment sur votre terrain.`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain") {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Building) {
                    this.stat("Constitution").increase(2);
                    this.stat("Force").increase(2);
                }
            }
        }
    };
};