import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class Cultiver extends Action {
    name = "Cultiver";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Nature", 8]]);

        this.initFamily(["Plante"]);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Plante.`,
            `Réduit de 25 le coût de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Plante")) {
                return true;
            }
            return false;
        };
        let cards: Card[] = this.owner().draw(1, readCondition);
        if (cards[0] != undefined) {
            cards[0].costReduce(25);
        }

        this.move("Défausse");
        this.pose();
    };
};