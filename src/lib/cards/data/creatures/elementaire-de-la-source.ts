import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDeLaSource extends Creature {
    name = "Élémentaire de la source";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : [source {10, Augmente de 2 votre production d'eau.}]`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.owner().ressource("Eau").total() >= 10) {
            this.owner().ressource("Eau").spend(10);

            this.owner().ressource("Eau").increase(2);
        }
    };
};