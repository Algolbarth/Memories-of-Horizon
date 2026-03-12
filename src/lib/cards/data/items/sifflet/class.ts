import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import Text from './text.svelte';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Sifflet extends Item {
    name = "Sifflet";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.text = Text;
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Bête")) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(15);
        }

        this.move("Défausse");
        this.pose();
    };
};