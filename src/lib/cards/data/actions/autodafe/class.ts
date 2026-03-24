import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Autodafe extends Action {
    name = "Autodafé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.addText([`Quand posé : Meule toutes les cartes sur votre pile.`, `Inflige autant de dégâts à toutes les unités sur le terrain adverse que de cartes meulées.`]);
    };

    canUse = () => {
        if (this.owner().zone("Pile").cards.length > 0 && (this.owner().is_player || this.adversary().zone("Terrain").cards.length > 0)) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let value = 0;

        let stack = copy(this.owner().zone("Pile").cards);
        for (const card of stack) {
            card.mill();
            value++;
        }

        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.damageByEffect(value);
        }

        this.move("Défausse");
        this.pose();
    };
};