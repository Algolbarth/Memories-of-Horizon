import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class FideleServiteur extends Creature {
    name = "Fidèle serviteur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 55]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Commandant.`,
            `Réduit de 100 le coût de cette carte.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Commandant")) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(100);
        }

        this.move("Terrain");
        this.pose();
    };
};