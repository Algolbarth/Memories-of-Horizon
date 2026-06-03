import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';
import { Building } from '$lib/cards/class/building';

export class ElementaireDeBriques extends Creature {
    name = "Élémentaire de briques";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Augmente de 25 la constitution d'un bâtiment sur votre terrain.`, `Augmente de 15 l'endurance de ce bâtiment.`, `Se détruit.`]]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
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
                    if (target == undefined && card instanceof Building) {
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

    useEffect = (choice: string, target: Building | undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.stat("Constitution").increase(25);
            target.stat("Endurance").increase(15);
        }

        this.pose();
    };
};