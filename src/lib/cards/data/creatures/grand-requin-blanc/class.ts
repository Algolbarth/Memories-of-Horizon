import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class GrandRequinBlanc extends Creature {
    name = "Grand requin blanc";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Eau", 50]]);

        this.initFamily(["Poisson"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);

        this.addText([
            `Quand posé : Pioche 3 créatures de famille Poisson.`,
            `Augmente de 5 sa constitution et sa force pour chaque créature de famille Poisson sur votre pile.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        this.owner().draw(3, readCondition);

        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                this.stat("Constitution").increase(5);
                this.stat("Force").increase(5);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};