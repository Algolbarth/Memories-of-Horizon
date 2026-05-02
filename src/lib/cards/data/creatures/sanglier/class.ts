import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Sanglier extends Creature {
    name = "Sanglier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Augmente de 5 sa force pour chaque créature de famille Bête sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Bête")) {
                this.stat("Force").increase(5);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};