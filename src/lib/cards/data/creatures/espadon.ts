import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Espadon extends Creature {
    name = "Espadon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35], ["Eau", 35]]);

        this.initFamily(["Poisson"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);
        this.stat("Percée").init(10);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Poisson.`,
            `Augmente de 5 sa force pour chaque créature de famille Poisson sur votre pile.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        this.owner().draw(1, readCondition);

        let value: number = 0;
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                value += 5;
            }
        }

        this.stat("Force").increase(value);

        this.move("Terrain");
        this.pose();
    };
};