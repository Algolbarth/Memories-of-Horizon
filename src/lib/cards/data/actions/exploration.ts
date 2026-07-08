import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Exploration extends Action {
    name = "Exploration";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 1 la taille de votre terrain.`);
    };

    useEffect = () => {
        this.owner().zone("Terrain").size += 1;

        this.move("Défausse");
        this.pose();
    };
};