import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class TirEnPleineTete extends Action {
    name = "Tir en pleine tête";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Inflige autant de dégâts spéciaux à une créature sur le terrain adverse que 10 fois le charisme de cette créature.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
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

            for (const card of this.owner().adversary().zone("Terrain").cards) {
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

        target.damage(target.stat("Charisme").value() * 10);

        this.move("Défausse");
        this.pose();
    };
};