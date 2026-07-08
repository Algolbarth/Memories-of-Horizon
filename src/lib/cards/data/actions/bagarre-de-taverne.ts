import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class BagarreDeTaverne extends Action {
    name = "Bagarre de taverne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Inflige 5 dégâts spéciaux à toutes les unités sur votre terrain.`,
            `Augmente de 10 la force de toutes les créatures sur votre terrain.`]);
    };

    canUse = () => {
        if (this.owner().is_player || this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            card.specialDamage(5, this);
            if (card instanceof Creature) {
                card.stat("Force").increase(10);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};