import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class GardeDEpine extends Creature {
    name = "Garde d'épine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(15);
        this.stat("Charisme").init(1);

        this.addText(`Quand posé : [resolve {50, Augmente de 10 son épine.}]`);
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 50) {
            this.stat("Épine").increase(10);
        }

        this.move("Terrain");
        this.pose();
    };
};