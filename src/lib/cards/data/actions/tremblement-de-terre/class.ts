import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class TremblementDeTerre extends Action {
    name = "Tremblement de terre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.addText(`Quand posé : Inflige 10 dégâts spéciaux à toutes les unités sur le terrain.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0 || (this.owner().is_player && this.owner().zone("Terrain").cards.length > 0)) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
        let double_battlefield = battlefield.concat(adversary_battlefield);

        for (const card of double_battlefield) {
            card.specialDamage(10, this);
        }

        this.move("Défausse");
        this.pose();
    };
};