import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class SavoirInterdit extends Action {
    name = "Savoir interdit";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Réduit de 1 la taille de votre terrain.`,
            `Augmente de 1 la taille de votre inventaire.`]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").size > 1) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().zone("Terrain").size -= 1;
        this.owner().zone("Inventaire").size += 1;

        this.move("Défausse");
        this.pose();
    };
};
