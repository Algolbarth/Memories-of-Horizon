import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Confiance extends Action {
    name = "Confiance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Quand posé : Augmente d'autant la constitution et la force d'une créature sur votre terrain que 10 fois le charisme de cette créature.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Charisme").value() > 0) {
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
                if (target == undefined && card instanceof Creature && card.stat("Charisme").value() > 0) {
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

        target.stat("Constitution").increase(10 * target.stat("Charisme").value());
        target.stat("Force").increase(10 * target.stat("Charisme").value());

        this.move("Défausse");
        this.pose();
    };
};