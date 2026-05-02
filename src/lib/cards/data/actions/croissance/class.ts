import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Croissance extends Action {
    name = "Croissance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Nature", 30]]);

        this.addChoice([
            `Augmente de 75 la constitution d'une créature sur votre terrain.`,
            `Augmente de 50 la constitution et la force d'une créature sur votre terrain.`]);
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
                if (target.isFamily("Plante")) {
                    this.useEffect(target, "life");
                }
                else {
                    this.useEffect(target, "balance");
                }
            }
        }
    };

    useEffect = (target: Creature, choice: string) => {
        this.targeting(target);

        if (choice == "life") {
            target.stat("Constitution").increase(75);
        }
        else if (choice == "balance") {
            target.stat("Force").increase(50);
            target.stat("Constitution").increase(50);
        }

        this.move("Défausse");
        this.pose();
    };
};