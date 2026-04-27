import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GuerrierElfe extends Creature {
    name = "Guerrier elfe";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Végétal", 8]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);

        this.addText(`Quand posé : [resolve {20, Augmente de 10 sa constitution et sa force.}]`);
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 20) {
            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }

        this.move("Terrain");
        this.pose();
    };
};