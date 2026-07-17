import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Bandit extends Creature {
    name = "Bandit";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : [prime {5, Augmente de 5 sa constitution et sa force.}]`);
    };

    useEffect = () => {
        if (this.owner().ressource("Or").total() >= 5) {
            this.owner().ressource("Or").spend(5);

            this.stat("Constitution").increase(5);
            this.stat("Force").increase(5);
        }

        this.move("Terrain");
        this.pose();
    };
};