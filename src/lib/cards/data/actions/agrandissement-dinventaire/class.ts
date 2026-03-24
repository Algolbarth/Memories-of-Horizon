import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class AgrandissementDInventaire extends Action {
    name = "Agrandissement d'inventaire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 1 la taille de votre inventaire.`);
    };

    useEffect = () => {
        this.owner().zone("Inventaire").size + 1;

        this.move("Défausse");
        this.pose();
    };
};