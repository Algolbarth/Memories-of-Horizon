import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Sardine extends Creature {
    name = "Sardine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 2], ["Eau", 2]]);

        this.initFamily(["Poisson"]);

        this.stat("Constitution").init(1);
        this.stat("Force").init(1);

        this.addText(`Quand posé : Pioche 1 créature de famille Poisson.`);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        this.owner().draw(1, readCondition);

        this.move("Terrain");
        this.pose();
    };
};