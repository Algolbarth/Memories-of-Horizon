import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDEau extends Creature {
    name = "Élémentaire d'eau";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 15]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addText(`Quand arrive sur le terrain : [source {5, Augmente de 5 sa constitution et sa force.}]`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain" && this.owner().ressource("Eau").total() >= 5) {
            this.owner().ressource("Eau").spend(5);

            this.stat("Constitution").increase(5);
            this.stat("Force").increase(5);
        }
    };
};