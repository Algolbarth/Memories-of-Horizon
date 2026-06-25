import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Spationaute extends Creature {
    name = "Spationaute";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Pioche 3 cartes de famille Spatial.`);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Spatial")) {
                return true;
            }
            return false;
        };
        this.owner().draw(3, readCondition);

        this.move("Terrain");
        this.pose();
    };
};