import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class CleEnOr extends Item {
    name = "Clé en or";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Augmente de 1 le niveau de votre pile pendant ce tour.`);
    };

    useEffect = () => {
        this.owner().zone("Pile").turn_level += 1;

        this.move("Défausse");
        this.pose();
    };
};