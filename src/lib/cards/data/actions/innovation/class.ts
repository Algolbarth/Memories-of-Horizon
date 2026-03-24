import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Innovation extends Action {
    name = "Innovation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75]]);

        this.addText(`Quand posé : Si votre pile est remplie : Augmente de 2 la taille de votre pile.`);
    };

    canUse = () => {
        if (this.owner().zone("Pile").isFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().zone("Pile").size += 2;

        this.move("Défausse");
        this.pose();
    };
};