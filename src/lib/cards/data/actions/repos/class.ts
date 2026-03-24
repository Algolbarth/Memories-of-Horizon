import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Repos extends Action {
    name = "Repos";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText([
            `Quand posé : Place une créature sur votre terrain sur la pile.`,
            `Soigne toutes les blessures de cette créature.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (this.owner().is_player || card.isDamaged())) {
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
                if (target == undefined && card instanceof Creature && card.isDamaged()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.move("Pile");

        target.fullHeal();

        this.move("Défausse");
        this.pose();
    };
};