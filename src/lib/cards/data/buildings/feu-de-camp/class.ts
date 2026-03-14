import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import Text from './text.svelte';
import { copy } from '$lib/utils';
import { Creature } from '$lib/cards/class/creature';

export class FeuDeCamp extends Building {
    name = "Feu de camp";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.stat("Constitution").init(10);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let battlefield = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Force").increase(3);
                }
            }
        }
    };
};