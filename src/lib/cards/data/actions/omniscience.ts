import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Omniscience extends Action {
    name = "Omniscience";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.addText(`Quand posé : Découvre autant de carte que nécessaire pour remplir votre pile.`);
    };

    canUse = () => {
        if (this.owner().zone("Pile").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().discover(this.owner().zone("Pile").size - this.owner().zone("Pile").cards.length);

        this.move("Défausse");
        this.pose();
    };
};