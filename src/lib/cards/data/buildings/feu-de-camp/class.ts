import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { copy } from '$lib/utils';
import { Creature } from '$lib/cards/class/creature';

export class FeuDeCamp extends Building {
    name = "Feu de camp";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 la constitution et la force de toutes les créatures sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Constitution").increase(1);
                    card.stat("Force").increase(1);
                }
            }
        }
    };
};