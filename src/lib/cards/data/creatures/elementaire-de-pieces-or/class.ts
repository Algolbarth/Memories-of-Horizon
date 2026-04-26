import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDePiecesDOr extends Creature {
    name = "Élémentaire de pièces d'or";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(150);
        this.stat("Force").init(150);

        this.addText(`Quand posé : [prime_inf {1, Augmente de 1 sa constitution et sa force.}]`);
    };

    useEffect = () => {
        let value: number = this.owner().ressource("Or").total();

        this.owner().ressource("Or").spend(this.owner().ressource("Or").total());

        this.stat("Constitution").increase(value);
        this.stat("Force").increase(value);

        this.move("Terrain");
        this.pose();
    };
};