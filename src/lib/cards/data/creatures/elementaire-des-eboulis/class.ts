import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ElementaireDesEboulis extends Creature {
    name = "Élémentaire des éboulis";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Endurance").init(5);

        this.addChoice([
            `Se place sur votre terrain.`,
            `Se détruit pour augmenter jusqu'à 1 l'étourdissement d'une créature sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        let check = false;
        for (const card of this.adversary().zone("Terrain").cards) {
            if (check == false && card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                check = true;
            }
        }

        if (this.adversary().zone("Terrain").cards.length > 0) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                let target = undefined;
                for (const card of this.adversary().zone("Terrain").cards) {
                    if (target == undefined && card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                        target = card;
                    }
                }
                this.useEffect("effect", target);
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

            target.stat("Étourdissement").fix(1);

            this.destroy();
        }

        this.pose();
    };
};