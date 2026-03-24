import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import type { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Melange extends Action {
    name = "Mélange";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Fusionne 2 objets de famille Potion dans votre inventaire en {card:Concoction}.`);
    };

    canUse = () => {
        let nb_potion = 0;
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card.isFamily("Potion")) {
                nb_potion++;
                if (nb_potion > 1) {
                    return true;
                }
            }
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            let potion_1 = undefined;
            let potion_2 = undefined;

            for (const card of this.owner().zone("Inventaire").cards) {
                if (potion_1 == undefined && card.isFamily("Potion")) {
                    potion_1 = card;
                }
                if (card != potion_1 && potion_2 == undefined && card.isFamily("Potion")) {
                    potion_2 = card;
                }
            }

            if (potion_1 != undefined && potion_2 != undefined) {
                this.useEffect(potion_1, potion_2);
            }
        }
    };

    useEffect = (potion_1: Item, potion_2: Item) => {
        potion_1.remove();
        potion_2.remove();

        let concoction = this.owner().getCard("Concoction");
        concoction.infuse(potion_1);
        concoction.infuse(potion_2);

        concoction.add("Inventaire");

        this.move("Défausse");
        this.pose();
    };
};