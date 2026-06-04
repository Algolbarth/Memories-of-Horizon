import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireOceanique extends Creature {
    name = "Élémentaire océanique";

    constructor(system: System) {
        super(system);

        this.init([["Eau", 500]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(100);

        this.addText(`Quand posé : [source_inf {1, Augmente de 5 sa constitution et sa force.}]`);
    };

    useEffect = () => {
        let value: number = this.owner().ressource("Eau").total();

        this.owner().ressource("Eau").spend(this.owner().ressource("Eau").total());

        this.stat("Constitution").increase(5 * value);
        this.stat("Force").increase(5 * value);

        this.move("Terrain");
        this.pose();
    };
};