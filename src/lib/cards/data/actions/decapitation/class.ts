import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class Decapitation extends Action {
    name = "Décapitation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.addText(`Quand posé : Détruit la créature sur le terrain adverse ayant le plus haut charisme.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.canBeDestroyed() && card.stat("Charisme").value() > 0) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let target: undefined | Creature = undefined;
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.canBeDestroyed() && ((target == undefined && card.stat("Charisme").value() > 0) || (target != undefined && card.stat("Charisme").value() > target.stat("Charisme").value()))) {
                target = card;
            }
        }

        target?.destroy();

        this.move("Défausse");
        this.pose();
    };
};