import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class CanonAEau extends Action {
    name = "Canon à eau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.addText([
            `Quand posé : Inflige 100 dégâts à une unité sur le terrain adverse.`,
            `Dépense autant d'eau que possible et inflige 2 fois plus de dégâts supplémentaires.`]);
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

        let value = 100;

        value += 2 * this.owner().ressource("Eau").total();
        this.owner().ressource("Eau").spend(this.owner().ressource("Eau").total());

        target.damageByEffect(value);

        this.move("Défausse");
        this.pose();
    };
};