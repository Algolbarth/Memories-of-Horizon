import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDeBulles extends Creature {
    name = "Élémentaire de bulles";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 5]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(1);
        this.stat("Force").init(5);
        this.stat("Garde").init(5);

        this.addText(`Quand se prépare sur le terrain : [source {5, Augmente jusqu'à 10 sa garde.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Eau").total() >= 5) {
            this.owner().ressource("Eau").spend(5);

            this.stat("Garde").increase(10);
        }
    };
};