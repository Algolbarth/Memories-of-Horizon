import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class Brochet extends Creature {
    name = "Brochet";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.initFamily(["Poisson"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Poisson.`,
            `Augmente de 1 sa constitution et sa force pour chaque créature de famille Poisson sur votre pile.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        this.owner().draw(1, readCondition);

        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                this.stat("Constitution").increase(1);
                this.stat("Force").increase(1);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};