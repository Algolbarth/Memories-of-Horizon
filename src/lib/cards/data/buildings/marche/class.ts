import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Marche extends Building {
    name = "Marché";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Réduit de 5 le coût en or de toutes les cartes sur votre pile.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let stack = copy(this.owner().zone("Pile").cards);
            for (const card of stack) {
                card.getCost("Or").decrease(5);
            }
        }
    };
};