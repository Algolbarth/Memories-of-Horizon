import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class PluieDeMeteorites extends Action {
    name = "Pluie de météorites";

    constructor(system: System) {
        super(system);

        this.init([["Or", 120]]);

        this.addChoice([
            `Stocke 10 flux.`,
            `Inflige 20 dégâts spéciaux à toutes les unités sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.owner().is_player || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("stockage");
            }
        }
        else {
            this.useEffect("damage");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "stockage") {
            this.owner().ressource("Flux").stock(10);
        }
        else if (choice == "damage") {
            let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(20, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};