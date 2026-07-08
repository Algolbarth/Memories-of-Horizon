import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Sage extends Creature {
    name = "Sage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Intelligence").init(1);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 son intelligence.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Intelligence").increase(1);
        }
    };
};