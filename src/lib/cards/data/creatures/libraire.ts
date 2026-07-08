import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Libraire extends Creature {
    name = "Libraire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Pioche 5 cartes de famille Livre.`);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Livre")) {
                return true;
            }
            return false;
        };
        this.owner().draw(5, readCondition);

        this.move("Terrain");
        this.pose();
    };
};