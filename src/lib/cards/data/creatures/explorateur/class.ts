import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Explorateur extends Creature {
    name = "Explorateur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 la taille de votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().zone("Terrain").size += 1;
        }
    };
};