import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class ExtensionDeTerritoire extends Action {
    name = "Extension de territoire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 1 la taille de votre région.`);
    };

    useEffect = () => {
        this.owner().zone("Région").size += 1;

        this.move("Défausse");
        this.pose();
    };
};