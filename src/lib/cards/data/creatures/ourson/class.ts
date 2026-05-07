import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class Ourson extends Creature {
    name = "Ourson";

    constructor(system: System) {
        super(system);

        this.init([["Or", 3], ["Terre", 3]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);
        this.stat("Endurance").init(2);

        this.addText(`Quand périt : Pioche 1 créature de famille Bête.`);
    };

    perishEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Bête")) {
                return true;
            }
            return false;
        };
        this.owner().draw(1, readCondition);
    };
};