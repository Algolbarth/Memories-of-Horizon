import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class RouteCommerciale extends Action {
    name = "Route commerciale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 1 la taille de votre pile.`);
    };

    useEffect = () => {
        this.owner().zone("Pile").size += 1;

        this.move("Défausse");
        this.pose();
    };
};