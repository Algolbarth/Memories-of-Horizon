import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class CoffreEnBois extends Item {
    name = "Coffre en bois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : Pioche 2 cartes.`);
    };

    useEffect = () => {
        this.owner().draw(2);

        this.move("Défausse");
        this.pose();
    };
};