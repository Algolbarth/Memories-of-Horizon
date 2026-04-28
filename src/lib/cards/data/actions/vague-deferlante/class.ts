import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class VagueDeferlante extends Action {
    name = "Vague déferlante";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.addText([
            `Quand posé : Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse.`,
            `[source {25, Inflige 10 dégâts spéciaux à la place.}]`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let value = 5;
        if (this.owner().ressource("Eau").total() >= 25) {
            this.owner().ressource("Eau").spend(25);
            value = 10;
        }

        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.specialDamage(value, this);
        }

        this.move("Défausse");
        this.pose();
    };
}