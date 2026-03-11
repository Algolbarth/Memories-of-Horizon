import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';
import Use from './use.svelte';

export class Riposte extends Action {
    name = "Riposte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length == 0) {
            return false;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Résistance").value() > 0) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            let target = undefined;

            for (const card of this.adversary().zone("Terrain").cards) {
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        let value: number = 0;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && value < card.stat("Résistance").value()) {
                value = card.stat("Résistance").value();
            }
        }

        target.damageByEffect(2 * value);

        this.move("Défausse");
        this.pose();
    };
};