import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class DeclarationDeGuerre extends Action {
    name = "Déclaration de guerre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Feu", 50]]);

        this.addText([
            `Quand posé : Augmente de 10 la force de toutes les créatures sur votre terrain.`,
            `Inflige 10 dégâts spéciaux à toutes les unités sur le terrain adverse.`]);
    };

    canUse = () => {
        let check: boolean = false;
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }
        if (check || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Force").increase(10);
            }
        }

        let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.specialDamage(10, this);
        }

        this.move("Défausse");
        this.pose();
    };
};