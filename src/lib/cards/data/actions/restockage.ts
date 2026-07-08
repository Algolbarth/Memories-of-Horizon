import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Restockage extends Action {
    name = "Restockage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Actualise votre pile.`);
    };

    useEffect = () => {
        this.owner().refreshStack();

        this.move("Défausse");
        this.pose();
    };
};