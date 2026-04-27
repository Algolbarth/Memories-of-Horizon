import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MageElfe extends Creature {
    name = "Mage elfe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Végétal", 12]]);

        this.initFamily(["Elfe", "Mage"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);
        this.stat("Magie").init(5);
        this.stat("Intelligence").init(2);

        this.addText(`Quand se prépare sur le terrain : [resolve {8, Augmente de 1 sa magie.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().totalIntelligence() >= 8) {
            this.stat("Magie").increase(1);
        }
    };
};