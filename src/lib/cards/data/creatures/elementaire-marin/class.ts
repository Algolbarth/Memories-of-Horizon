import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireMarin extends Creature {
    name = "Élémentaire marin";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 50]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText(`Quand se prépare sur le terrain : [source {10, Augmente de 10 sa constitution et sa force.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Eau").total() >= 10) {
            this.owner().ressource("Eau").spend(10);

            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};