import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';

export class Incendie extends Action {
    name = "Incendie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Feu", 40]]);

        this.addText(`Quand posé : Augmente de 5 la brûlure de toutes les unités sur le terrain adverse.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.stat("Brûlure").increase(5);
        }

        this.move("Défausse");
        this.pose();
    };
};