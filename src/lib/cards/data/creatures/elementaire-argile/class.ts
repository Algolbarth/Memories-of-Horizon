import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ElementaireDArgile extends Creature {
    name = "Élémentaire d'argile";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 25]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(10);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Augmente de 10 la constitution, la force et l'endurance d'une créature sur votre terrain.`, `Se détruit.`]]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
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
                    this.useEffect("effect", target);
                }
            }
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature", undefined);
        }
    };

    useEffect = (choice: string, target: Creature | undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.stat("Constitution").increase(10);
            target.stat("Force").increase(10);
            target.stat("Endurance").increase(10);
        }

        this.pose();
    };
};