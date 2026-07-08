import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Tresor extends Item {
    name = "Trésor";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText([
            `Quand posé : Pioche 5 cartes.`,
            `Produit 10 or.`]);
    };

    useEffect = () => {
        this.owner().draw(5);
        this.owner().ressource("Or").produce(10);

        this.move("Défausse");
        this.pose();
    };
};