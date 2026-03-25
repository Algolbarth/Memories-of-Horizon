import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class Rembourrage extends Action {
    name = "Rembourrage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Augmente de 10 la constitution d'une carte de famille Armure dans votre inventaire.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card.isFamily("Armure")) {
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

            for (const card of this.owner().zone("Inventaire").cards) {
                if (target == undefined && card.isFamily("Armure")) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Equipment) => {
        this.targeting(target);

        target.equipStat("Constitution").increase(10);

        this.move("Défausse");
        this.pose();
    };
};