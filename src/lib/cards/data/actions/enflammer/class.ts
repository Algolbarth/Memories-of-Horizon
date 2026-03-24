import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class Enflammer extends Action {
    name = "Enflammer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 4], ["Feu", 4]]);

        this.addText(`Quand posé : Augmente de 5 la brûlure d'une unité sur le terrain adverse.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect(this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Brûlure").increase(5);

        this.move("Défausse");
        this.pose();
    };
};