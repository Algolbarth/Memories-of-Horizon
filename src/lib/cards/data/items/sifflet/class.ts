import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Sifflet extends Item {
    name = "Sifflet";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Bête.`,
            `Réduit de 15 le coût de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Bête")) {
                return true;
            }
            return false;
        };
        let cards: Card[] = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(15);
        }

        this.move("Défausse");
        this.pose();
    };
};