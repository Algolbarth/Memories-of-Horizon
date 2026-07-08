import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireArdent extends Creature {
    name = "Élémentaire ardent";

    constructor(system: System) {
        super(system);

        this.init([["Feu", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);

        this.addText(`Quand se prépare sur le terrain : [blaze {1, Augmente de 10 sa constitution et sa force.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Feu").production >= 1) {
            this.owner().ressource("Feu").decrease(1);

            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};