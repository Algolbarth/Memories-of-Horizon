import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Grenouille extends Creature {
    name = "Grenouille";

    constructor(system: System) {
        super(system);

        this.init([["Or", 3], ["Eau", 2]]);

        this.stat("Constitution").init(2);
        this.stat("Force").init(2);

        this.addText(`Quand se prépare sur le terrain : Se place dans l'inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.move("Inventaire");
        }
    };
};