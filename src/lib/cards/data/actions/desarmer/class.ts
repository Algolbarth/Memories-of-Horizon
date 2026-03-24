import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Desarmer extends Action {
    name = "Désarmer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Détruit tous les équipements d'une créature sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
                for (const e of card.equipments) {
                    if (e.canBeDestroyed()) {
                        return true;
                    }
                }
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
                if (target == undefined && card instanceof Creature) {
                    for (const e of card.equipments) {
                        if (e.canBeDestroyed()) {
                            target = card;
                        }
                    }
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        for (const equipment of target.equipments) {
            if (equipment.canBeDestroyed()) {
                equipment.destroy();
            }
        }

        this.move("Défausse");
        this.pose();
    };
};