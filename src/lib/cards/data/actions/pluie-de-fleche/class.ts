import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';

export class PluieDeFleche extends Action {
    name = "Pluie de flèche";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText(`Quand posé : Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse.`);
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
            card.specialDamage(5, this);
        }

        this.move("Défausse");
        this.pose();
    };
};