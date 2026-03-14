import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import Text from './text.svelte';

export class Marche extends Building {
    name = "Marché";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.stat("Constitution").init(20);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let inventory = copy(this.owner().zone("Pile").cards);
            for (const card of inventory) {
                card.getCost("Or").decrease(5);
            }
        }
    };
};