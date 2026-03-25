import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/class';

export class PotEnTerreCuite extends Item {
    name = "Pot en terre cuite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.addText([
            `Quand posé : Pioche 3 cartes de niveau 1.`,
            `Réduit de 10 le coût de ces cartes.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.level == 1) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(3, readCondition, this);
        for (const card of cards) {
            card.costReduce(10);
        }

        this.move("Terrain");
        this.pose();
    };
};
