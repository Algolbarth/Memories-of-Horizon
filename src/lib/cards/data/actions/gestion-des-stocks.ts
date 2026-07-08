import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class GestionDesStocks extends Action {
    name = "Gestion des stocks";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75]]);

        this.addText(`Quand posé : Si votre inventaire est rempli : Augmente de 2 la taille de votre inventaire.`);
    };

    canUse = () => {
        if (this.owner().zone("Inventaire").isFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().zone("Inventaire").size += 2;

        this.move("Défausse");
        this.pose();
    };
};