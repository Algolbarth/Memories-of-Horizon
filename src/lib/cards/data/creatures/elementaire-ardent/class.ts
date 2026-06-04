import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireArdent extends Creature {
    name = "Élémentaire ardent";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 35]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand se prépare sur le terrain : [blaze {1, Augmente de 10 sa constitution et sa force.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Feu").production >= 2) {
            this.owner().ressource("Feu").decrease(2);

            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};