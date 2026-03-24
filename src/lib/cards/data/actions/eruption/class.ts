import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class Eruption extends Action {
    name = "Éruption";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75], ["Feu", 75]]);

        this.addText(`Quand posé : Inflige 300 dégâts à une unité sur le terrain adverse.`);
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

        target.damageByEffect(300);

        this.move("Défausse");
        this.pose();
    };
};