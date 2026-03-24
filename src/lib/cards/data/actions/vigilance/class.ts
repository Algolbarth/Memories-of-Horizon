import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Vigilance extends Action {
    name = "Vigilance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12]]);

        this.addChoice([
            `Augmente de 10 l'endurance d'une créature sur votre terrain.`,
            `Augmente de 10 la résistance d'une créature sur votre terrain.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
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
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target, "endurance");
            }
        }
    };

    useEffect = (target: Creature, choice: string) => {
        this.targeting(target);

        if (choice == "endurance") {
            target.stat("Endurance").increase(10);
        }
        else if (choice == "résistance") {
            target.stat("Résistance").increase(10);
        }

        this.move("Défausse");
        this.pose();
    };
};