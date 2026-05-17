import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';

export class Alambic extends Building {
    name = "Alambic";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 les infusions de toutes les objets de famille Potion dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let inventory: Card[] = copy(this.owner().zone("Inventaire").cards);
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