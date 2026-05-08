import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Item } from '$lib/cards/class/item';

export class CoffreEnOr extends Item {
    name = "Coffre en or";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Pioche 2 cartes du même niveau que votre pile.`,
            `Réduit de 20 le coût de ces cartes.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card, drawer: Card) => {
            if (drawer.owner().zone("Pile").level() == card.level) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(2, readCondition, this);
        for (const card of cards) {
            card.costReduce(20);
        }

        this.move("Défausse");
        this.pose();
    };
};