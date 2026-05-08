import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Elementaliste extends Creature {
    name = "Élémentaliste";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Pioche 1 carte de famille Élémentaire.`,
            `Réduit de 20 le coût de cette carte.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Élémentaire")) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(20);
        }

        this.move("Terrain");
        this.pose();
    };
};