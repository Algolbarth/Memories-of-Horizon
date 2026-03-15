import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class Abattage extends Action {
    name = "Abattage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.text = Text;
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.canBeDestroyed()) {
                return true;
            }
        }
        return false;
    };

    useEffect = () => {
        let target: undefined | Creature = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.canBeDestroyed() && (target == undefined || (target != undefined && card.stat("Vitalité").value() > target.stat("Vitalité").value()))) {
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