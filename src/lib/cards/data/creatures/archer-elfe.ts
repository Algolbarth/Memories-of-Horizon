import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ArcherElfe extends Creature {
    name = "Archer elfe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Nature", 8]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);
        this.stat("Portée").init(5);

        this.addText(`Quand posé : [resolve {15, Augmente de 5 sa portée.}]`);
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 15) {
            this.stat("Portée").increase(5);
        }

        this.move("Terrain");
        this.pose();
    };
};