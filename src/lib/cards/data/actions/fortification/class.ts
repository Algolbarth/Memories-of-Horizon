import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';
import { Unit } from '$lib/cards/class/unit';

export class Fortification extends Action {
    name = "Fortification";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Pioche 1 unité de famille Mur.`,
            `Réduit de 25 le coût de cette unité.`,
            `Augmente de 50 la constitution de cette unité.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Unit && card.isFamily("Mur")) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);
        if (cards[0] != undefined) {
            cards[0].costReduce(25);
            cards[0].stat("Constitution").increase(50);
        }

        this.move("Défausse");
        this.pose();
    };
};