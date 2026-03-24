import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class CocktailExplosif extends Item {
    name = "Cocktail explosif";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.addText(`Quand posé : Augmente de 10 la brûlure d'une unité sur le terrain adverse et aux unités adjacentes.`);
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

        target.stat("Brûlure").increase(10);
        if (target.slot != undefined && target.zone) {
            if (target.slot > 0) {
                target.zone.cards[target.slot - 1].stat("Brûlure").increase(10);
            }
            if (target.slot < target.zone.cards.length - 1) {
                target.zone.cards[target.slot + 1].stat("Brûlure").increase(10);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};