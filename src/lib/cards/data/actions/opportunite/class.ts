import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Opportunite extends Action {
    name = "Opportunité";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addChoice([
            `Découvre 1 carte.`,
            `Augmente de 1 l'initiative d'une créature sur votre terrain pendant ce tour.`]);
    };

    select = () => {
        if (this.owner().is_player) {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("discover");
            }
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect("initiative", target);
            }
            else {
                this.useEffect("discover");
            }
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "initiative" && target != undefined) {
            this.targeting(target);

            target.stat("Initiative").turn += 1;
        }
        else if (choice == "discover") {
            this.owner().discover(1);
        }

        this.move("Défausse");
        this.pose();
    };
};