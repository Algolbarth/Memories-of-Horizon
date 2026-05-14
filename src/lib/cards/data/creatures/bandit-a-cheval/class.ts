import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class BanditACheval extends Creature {
    name = "Bandit à cheval";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(20);

        this.addText(`Quand posé : [prime {10, Augmente de 1 sa vitesse.}]`);
    };

    useEffect = () => {
        if (this.owner().ressource("Or").total() >= 10) {
            this.owner().ressource("Or").spend(10);

            this.stat("Vitesse").increase(1);
        }

        this.move("Terrain");
        this.pose();
    };
};