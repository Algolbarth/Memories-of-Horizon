import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';
import { Creature } from '$lib/cards/class/creature';

export class DoseMortelle extends Action {
    name = "Dose mortelle";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Détruit une créature ayant sa vitalité inférieure ou égale au produit de son poison et de sa toxicité.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Poison").value() * card.stat("Toxicité").value() >= card.stat("Vitalité").value()) {
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

            for (const card of this.adversary().zone("Terrain").cards) {
                if (card instanceof Creature && card.stat("Poison").value() * card.stat("Toxicité").value() >= card.stat("Vitalité").value()) {
                    return true;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.destroy();

        this.move("Défausse");
        this.pose();
    };
};