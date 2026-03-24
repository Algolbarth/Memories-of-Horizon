import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class RazDeMaree extends Action {
    name = "Raz-de-marée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Eau", 50]]);

        this.addText([
            `Quand posé : Inflige 20 dégâts à toutes les unités sur le terrain adverse.`,
            `Dépense autant d'eau que possible et inflige 1 dégât supplémentaire pour chaque 5 eau dépensé.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let value = 20;
        while (this.owner().ressource("Eau").total() >= 5) {
            this.owner().ressource("Eau").spend(5);
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