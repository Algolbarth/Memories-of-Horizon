import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class Pietinement extends Action {
    name = "Piétinement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.addText(`Quand posé : Détruit la créature sur le terrain adverse ayant la force la plus haute.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Force").value() > 0) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let target: undefined | Creature = undefined;
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.canBeDestroyed() && ((target == undefined && card.stat("Force").value() > 0) || (target != undefined && card.stat("Force").value() > target.stat("Force").value()))) {
                target = card;
            }
        }

        if (target != undefined) {
            this.targeting(target);

            target.destroy();
        }

        this.move("Défausse");
        this.pose();
    };
};