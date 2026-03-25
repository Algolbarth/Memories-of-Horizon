import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/class';

export class PlanDeConstruction extends Item {
    name = "Plan de construction";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText([
            `Quand posé : Pioche 1 bâtiment.`,
            `Réduit de 25 le coût de ce bâtiment.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Building) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(25);
        }

        this.move("Terrain");
        this.pose();
    };
};
