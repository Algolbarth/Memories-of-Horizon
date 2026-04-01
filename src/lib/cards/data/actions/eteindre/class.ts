import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';

export class Eteindre extends Action {
    name = "Éteindre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.addText(`Quand posé : Réduit de 60 la force et vide la jauge critique d'une créature sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && (card.stat("Force").value() > 0 || card.stat("Critique").value() > 0)) {
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
                if (target == undefined && card instanceof Creature && (card.stat("Force").value() > 0 || card.stat("Critique").value() > 0)) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Force").decrease(60);
        target.stat("Critique").set(0);

        this.move("Défausse");
        this.pose();
    };
};