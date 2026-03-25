import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';

export class AmplificationMagique extends Action {
    name = "Amplification magique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.addText(`Quand posé : Augmente de 25 la magie d'une unité de famille Mage sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card.isFamily("Mage")) {
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
                if (target == undefined && card.isFamily("Mage")) {
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

        target.stat("Magie").increase(25);

        this.move("Défausse");
        this.pose();
    };
};