import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Conquete extends Action {
    name = "Conquête";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75]]);

        this.addText(`Quand posé : Si votre terrain est rempli : Augmente de 2 la taille de votre terrain.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().zone("Terrain").size += 2;

        this.move("Défausse");
        this.pose();
    };
};