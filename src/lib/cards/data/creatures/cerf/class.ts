import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class Cerf extends Creature {
    name = "Cerf";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(15);

        this.addText(`Quand posé : Augmente de 5 sa constitution pour chaque créature de famille Bête sur votre terrain.`);
    };

    useEffect = () => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature && card.isFamily("Bête")) {
                this.stat("Constitution").increase(5);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};