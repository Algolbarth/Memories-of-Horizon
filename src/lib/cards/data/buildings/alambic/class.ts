import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import Text from './text.svelte';
import { Item } from '$lib/cards/class/item';

export class Alambic extends Building {
    name = "Alambic";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(10);

        this.text = Text;
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let inventory = copy(this.owner().zone("Inventaire").cards);
            for (const card of inventory) {
                if (card instanceof Item && card.isFamily("Potion")) {
                    if (card.name == "Concoction") {
                        for (const stat of card.stats) {
                            if (stat.name.includes("Infusion") && stat.value() > 0) {
                                card.stat(stat.name).increase(1);
                            }
                        }
                    }
                    else {
                        card.stat("Infusion").increase(1);
                    }
                }
            }
        }
    };
};