import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import type { Unit } from '$lib/cards/class/unit';

export class ArbaletrierNain extends Creature {
    name = "Arbalétrier nain";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);
        this.stat("Portée").init(5);
        this.stat("Percée").init(10);

        this.addText(`Quand arrive sur le terrain : Augmente de 2 sa portée pour chaque bâtiment sur votre terrain.`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain") {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Building) {
                    this.stat("Portée").increase(2);
                }
            }
        }
    };
};