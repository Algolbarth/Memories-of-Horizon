import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';
import Use from './use.svelte';
import type { Card } from '$lib/cards/class/card';

export class BucherDesVanites extends Action {
    name = "Bûcher des vanités";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.addText([
            `Quand posé : Meule toutes les cartes sur votre pile.`,
            `Inflige autant de dégâts spéciaux à une unité sur le terrain adverse que 10 fois le nombre de cartes meulées.`]);
    };

    canUse = () => {
        if (this.owner().zone("Pile").cards.length > 0 && this.adversary().zone("Terrain").cards.length > 0) {
            return true;
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
                if (target == undefined) {
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

        let value = 0;

        let stack: Card[] = copy(this.owner().zone("Pile").cards);
        for (const card of stack) {
            card.mill();
            value++;
        }

        target.specialDamage(10 * value, this);

        this.move("Défausse");
        this.pose();
    };
};