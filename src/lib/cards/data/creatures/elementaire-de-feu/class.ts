import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDeFeu extends Creature {
    name = "Élémentaire de feu";

    constructor(system: System) {
        super(system);

        this.init([["Feu", 15]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addText(`Quand arrive sur le terrain : [blaze {2, Augmente de 10 sa constitution et sa force.}]`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain" && this.owner().ressource("Feu").production >= 2) {
            this.owner().ressource("Feu").decrease(2);

            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};