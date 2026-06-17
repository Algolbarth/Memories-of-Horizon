import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Unit } from '$lib/cards/class/unit';

export class Blason extends Item {
    name = "Blason";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 5 l'endurance de toutes les créatures sur votre terrain.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            card.stat("Endurance").increase(5);
        }

        this.move("Défausse");
        this.pose();
    };
};