import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class MonstreErrant extends Action {
    name = "Monstre errant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 55]]);

        this.addText([
            `Quand posé : Pioche 1 créature.`,
            `Augmente de 100 la constitution et la force de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);
        if (cards[0] != undefined) {
            cards[0].stat("Constitution").increase(100);
            cards[0].stat("Force").increase(100);
        }

        this.move("Défausse");
        this.pose();
    };
};