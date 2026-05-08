import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Action } from '$lib/cards/class/action';

export class Forger extends Action {
    name = "Forger";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addText(`Quand posé : Découvre 1 carte de famille Équipement.`);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Équipement")) {
                return true;
            }
            return false;
        };
        this.owner().discover(1, readCondition);
        this.move("Défausse");
        this.pose();
    };
};