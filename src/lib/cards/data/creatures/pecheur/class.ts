import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Pecheur extends Creature {
    name = "Pêcheur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Eau", 8]]);

        this.initFamily(["Ondin"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Poisson.`,
            `Réduit de 20 le coût de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        let cards: Card[] = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].costReduce(20);
        }

        this.move("Terrain");
        this.pose();
    };
};