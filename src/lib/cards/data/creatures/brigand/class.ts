import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Brigand extends Creature {
    name = "Brigand";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);

        this.addText(`Quand se prépare sur le terrain : [prime {5, Augmente de 5 sa constitution et sa force.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Or").total() >= 5) {
            this.owner().ressource("Or").spend(5);

            this.stat("Constitution").increase(5);
            this.stat("Force").increase(5);
        }
    };
};