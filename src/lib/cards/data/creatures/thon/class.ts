import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Thon extends Creature {
    name = "Thon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.initFamily(["Poisson"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Poisson.`,
            `Produit 3 eau pour chaque créature de famille Poisson sur votre pile.`]);
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
                this.owner().ressource("Eau").produce(3);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};