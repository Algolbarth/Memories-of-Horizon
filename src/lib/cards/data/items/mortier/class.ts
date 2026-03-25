import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';
import { Building } from '$lib/cards/class/building';

export class Mortier extends Item {
    name = "Mortier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.addText(`Quand posé : Augmente de 30 l'endurance d'un bâtiment sur votre terrain.`);
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

        target.stat("Endurance").increase(30);

        this.move("Défausse");
        this.pose();
    };
};