import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Bivouac extends Building {
    name = "Bivouac";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Soigne 10 blessures à toutes les créatures sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.heal(10);
                }
            }
        }
    };
};