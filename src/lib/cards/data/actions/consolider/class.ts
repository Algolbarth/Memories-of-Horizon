import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';
import { Building } from '$lib/cards/class/building';

export class Consolider extends Action {
    name = "Consolider";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText(`Quand posé : Augmente de 50 la constitution d'un bâtiment sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
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

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Building) {
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

        target.stat("Constitution").increase(50);

        this.move("Défausse");
        this.pose();
    };
};