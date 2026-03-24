import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MageDeFeu extends Creature {
    name = "Mage de feu";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.initFamily(["Gobelin", "Mage"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(20);
        this.stat("Magie").init(10);

        this.addText(`Quand se prépare sur le terrain : Réduit de 1 sa magie.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Magie").decrease(1);
        }
    };
};