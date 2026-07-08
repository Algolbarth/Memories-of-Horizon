import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class CarteDeLaRegion extends Item {
    name = "Carte de la région";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Pioche autant de carte que nécessaire pour remplir votre pile.`);
    };

    canUse = () => {
        if (this.owner().zone("Pile").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().draw(this.owner().zone("Pile").size - this.owner().zone("Pile").cards.length);
        this.move("Défausse");
        this.pose();
    };
};