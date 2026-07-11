import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';

export class Lapin extends Creature {
    name = "Lapin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Nature", 5]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText([
            `Quand meurt : Pioche 1 créature de famille Bête et la verrouille.`,
            `Augmente de 10 la perception de cette créature.`]);
    };

    dieEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Bête")) {
                return true;
            }
            return false;
        };
        let cards: Card[] = this.owner().draw(1, readCondition);
        for (const c of cards) {
            c.lock();
            c.stat("Perception").increase(10);
        }
    };
};