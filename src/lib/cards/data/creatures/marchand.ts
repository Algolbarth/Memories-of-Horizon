import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Marchand extends Creature {
    name = "Marchand";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 votre production d'or.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Or").increase(1);
        }
    };
};