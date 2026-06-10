import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Knight } from '$lib/cards/class/knight';

export class Adoubement extends Action {
    name = "Adoubement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Chevalier"]);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Chevalier.`,
            `Si cette créature est à terre : la transforme en sa forme alternative.`,
            `Réduit de 50 le coût de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Chevalier")) {
                return true;
            }
            return false;
        };
        let cards: Card[] = this.owner().draw(1, readCondition);
        if (cards[0] != undefined) {
            if (cards[0] instanceof Knight && cards[0].trait("À terre").value()) {
                cards[0].transform(cards[0].alternative_form);
            }
            cards[0].costReduce(50);
        }

        this.move("Défausse");
        this.pose();
    };
};