import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class General extends Creature {
    name = "Général";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.initFamily(["Humain", "Commandant"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Constitution").increase(5);
                    card.stat("Force").increase(5);
                }
            }
        }
    };
};