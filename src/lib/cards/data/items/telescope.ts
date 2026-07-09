import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { copy } from '$lib/utils';
import type { Card } from '$lib/cards/class/card';

export class Telescope extends Item {
    name = "Télescope";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText([`Quand posé : Augmente de 10 la perception de toutes les cartes dans votre pile.`]);
    };

    useEffect = () => {
        let stack: Card[] = copy(this.owner().zone("Terrain").cards);
        for (const card of stack) {
            card.stat("Perception").increase(10);
        }

        this.move("Défausse");
        this.pose();
    };
};