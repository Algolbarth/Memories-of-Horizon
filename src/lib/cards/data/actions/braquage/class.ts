import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Building } from '$lib/cards/class/building';
import Use from './use.svelte';

export class Braquage extends Action {
    name = "Braquage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Produit autant de ressources que la vente d'un bâtiment sur votre terrain.`,
            `Fixe à 0 la vente de ce bâtiment.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
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
                if (target == undefined && card instanceof Building) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Building) => {
        this.targeting(target);

        for (const sale of target.sale) {
            this.owner().ressource(sale.name).produce(sale.value());

            sale.turn = 0;
            sale.add = -sale.base;
        }

        this.move("Défausse");
        this.pose();
    };
};