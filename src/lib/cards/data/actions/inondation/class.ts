import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Building } from '$lib/cards/class/building';
import Text from './text.svelte';
import Use from './use.svelte';

export class Inondation extends Action {
    name = "Inondation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35], ["Eau", 35]]);

        this.text = Text;
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Building && card.canBeDestroyed() && !card.isElement("Eau")) {
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
                if (target == undefined && card instanceof Building && card.canBeDestroyed() && !card.isElement("Eau")) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Building) => {
        this.targeting(target);

        target.destroy();

        this.move("Défausse");
        this.pose();
    };
};