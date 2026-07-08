import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';

export class RazDeMaree extends Action {
    name = "Raz-de-marée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Eau", 50]]);

        this.addText([
            `Quand posé : Inflige 20 dégâts spéciaux à toutes les unités sur le terrain adverse.`,
            `[source_inf {5, Inflige 1 dégât supplémentaire.}]`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let damage: number = 20;

        while (this.owner().ressource("Eau").total() >= 5) {
            this.owner().ressource("Eau").spend(5);
            damage++;
        }

        let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.specialDamage(damage, this);
        }

        this.move("Défausse");
        this.pose();
    };
};