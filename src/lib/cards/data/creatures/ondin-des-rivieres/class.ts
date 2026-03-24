import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class OndinDesRivieres extends Creature {
    name = "Ondin des rivières";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Produit 10 eau.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Eau").produce(10);
        }
    };
};