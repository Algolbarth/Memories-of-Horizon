import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Brigand extends Creature {
    name = "Brigand";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Endurance").init(5);

        this.addText(`Quand se prépare sur le terrain : [prime {10, Augmente de 10 sa constitution et sa force.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Or").total() >= 10) {
            this.owner().ressource("Or").spend(10);

            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};