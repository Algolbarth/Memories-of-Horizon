import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';

export class VoyageInitiatique extends Action {
    name = "Voyage initiatique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.level <= 5) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);
        if (cards[0] != undefined) {
            cards[0].costReduce(25);
            cards[0].stat("Constitution").increase(25);
            cards[0].stat("Force").increase(25);
        }

        this.move("Défausse");
        this.pose();
    };
}